import { FieldValue } from "firebase-admin/firestore";
import { Report, UpdateReportData } from "types/reports";

import { InvalidArgumentError, UnauthenticatedError } from "./lib/errors";
import { newFunction } from "./lib/firebase";
import { firestore } from "./lib/firebase";
import { createDocument, fetchDocument } from "./lib/helpers";
import { isImageSpam } from "./lib/images";

export const createReport = newFunction.https.onCall(async (data, { auth }) => {
  if (!auth) {
    throw UnauthenticatedError;
  }

  const currentUser = await fetchDocument("users", auth.uid);

  if (!currentUser) {
    throw UnauthenticatedError;
  }

  const result = Report.safeParse(data);

  if (!result.success) {
    throw InvalidArgumentError;
  }

  const submittedReport = result.data;

  const isSpam = await isImageSpam(submittedReport.image);

  const safeReportData: Report = {
    id: "",
    anonymous: submittedReport.anonymous,
    category: submittedReport.category,
    date: submittedReport.date,
    description: submittedReport.description,
    reacts: {
      happy: 0,
      neutral: 0,
      sad: 0,
    },
    severity: submittedReport.severity,
    solved: false,
    spam: isSpam,
    image: submittedReport.image,
    title: submittedReport.title,
    usersReacted: [],
  };

  if (!safeReportData.anonymous) {
    safeReportData.user = currentUser;
  }

  await createDocument("reports", safeReportData);
});

export const updateReport = newFunction.https.onCall(async (data, { auth }) => {
  if (!auth) {
    throw UnauthenticatedError;
  }

  const result = UpdateReportData.safeParse(data);

  if (!result.success) {
    throw InvalidArgumentError;
  }

  const { reportId, action } = result.data;

  const docRef = firestore.collection("reports").doc(reportId);

  switch (action) {
    case "downvote": {
      const docSnap = await docRef.get();
      const docData = docSnap.data() as Report | undefined;

      if (!docSnap.exists || !docData) {
        throw InvalidArgumentError;
      }

      await docRef.update({
        reacts: {
          ...docData.reacts,
          sad: docData.reacts.sad + 1,
        },
        usersReacted: FieldValue.arrayUnion(auth.uid),
      });

      return;
    }

    case "upvote": {
      const docSnap = await docRef.get();
      const docData = docSnap.data() as Report | undefined;

      if (!docSnap.exists || !docData) {
        throw InvalidArgumentError;
      }

      await docRef.update({
        reacts: {
          ...docData.reacts,
          happy: docData.reacts.happy + 1,
        },
        usersReacted: FieldValue.arrayUnion(auth.uid),
      });

      return;
    }

    case "mark-solved": {
      await docRef.update({
        solved: true,
      });

      return;
    }
    case "delete": {
      await docRef.delete();

      return;
    }
  }
});
