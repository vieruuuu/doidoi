import { User } from "types/users";

import { UnauthenticatedError } from "./lib/errors";
import { newFunction } from "./lib/firebase";
import { setDocument } from "./lib/helpers";

export const createUser = newFunction.https.onCall(async (data, { auth }) => {
  if (!auth) {
    throw UnauthenticatedError;
  }

  const user = User.parse(data);

  await setDocument("users", auth.uid, user);
});
