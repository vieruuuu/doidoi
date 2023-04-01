import type { FirestoreCollection } from "types/collections";
import { firestore } from "./firebase";

import { doc, getDoc } from "firebase/firestore/lite";

export async function fetchDocument<
  T extends keyof FirestoreCollection,
  G extends FirestoreCollection[T]
>(collection: T, id: string): Promise<G | undefined> {
  const docRef = doc(firestore, collection, id);
  const snap = await getDoc(docRef);

  const data = snap.data() as G;

  if (!data) {
    return undefined;
  }

  return {
    ...data,
    id: snap.id,
  };
}
