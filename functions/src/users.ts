import { User } from "types/users";
import { firestore, newFunction } from "./lib/firebase";

export const createUser = newFunction.https.onCall(async (data) => {
  const user = User.parse(data);

  await firestore.collection("users").doc(user.id).set(user);
});
