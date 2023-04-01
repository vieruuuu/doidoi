import { Report } from "types/reports";

import { InvalidArgumentError, UnauthenticatedError } from "./lib/errors";
import { newFunction } from "./lib/firebase";
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
  };

  if (!safeReportData.anonymous) {
    safeReportData.user = currentUser;
  }

  await createDocument("reports", safeReportData);
});
