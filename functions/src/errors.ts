import { https } from "firebase-functions";
const { HttpsError } = https;

export const InvalidUnitData = new HttpsError(
  "invalid-argument",
  "Invalid unit data"
);

export const NotFound = new HttpsError("not-found", "Not found");

export const InvalidData = new HttpsError("invalid-argument", "Invalid data");

export const NotImplemented = new HttpsError("internal", "Not implemented");

export const OnlyForManagersAndLandlords = new HttpsError(
  "permission-denied",
  "Only for managers and landlords"
);

export const OnlyForGuestsAndTenants = new HttpsError(
  "permission-denied",
  "Only for guests and tenants"
);

export const OnlyForTenants = new HttpsError(
  "permission-denied",
  "Only for tenants"
);

export const InvalidCredentials = new HttpsError(
  "permission-denied",
  "Invalid credentials"
);

export const InvalidAppCheck = new HttpsError(
  "failed-precondition",
  "The function must be called from an App Check verified app."
);
