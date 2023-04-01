import { https } from "firebase-functions";

export const InvalidArgumentError = new https.HttpsError(
  "invalid-argument",
  "Invalid argument"
);

export const UnauthenticatedError = new https.HttpsError(
  "unauthenticated",
  "Unauthenticated"
);
