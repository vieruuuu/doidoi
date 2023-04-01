import type { User } from "types/users";
import { firebaseFunctions } from "./firebase";
import { httpsCallable } from "firebase/functions";

export const createUser = httpsCallable<User, void>(
  firebaseFunctions,
  "createUser"
);

export const testImageLabel = httpsCallable<void, void>(
  firebaseFunctions,
  "testImageLabel"
);
