import { httpsCallable } from "firebase/functions";
import type { Report, UpdateReportData } from "types/reports";
import type { User } from "types/users";

import { firebaseFunctions } from "./firebase";

export const createUser = httpsCallable<User, void>(
  firebaseFunctions,
  "createUser"
);

export const createReport = httpsCallable<Report, void>(
  firebaseFunctions,
  "createReport"
);

export const updateReport = httpsCallable<UpdateReportData, void>(
  firebaseFunctions,
  "updateReport"
);
