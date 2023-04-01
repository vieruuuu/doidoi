import { FirestoreCollection } from "types/collections";
import { firestore } from "./firebase";

export async function fetchDocument<
  T extends keyof FirestoreCollection,
  G extends FirestoreCollection[T]
>(collection: T, id: string): Promise<G | undefined> {
  const snap = await firestore.collection(collection).doc(id).get();
  const data = snap.data() as G;

  return {
    ...data,
    id: snap.id,
  };
}

export async function createDocument<
  T extends keyof FirestoreCollection,
  G extends FirestoreCollection[T]
>(collection: T, data: G): Promise<string> {
  const ref = await firestore.collection(collection).add(data);

  return ref.id;
}

export async function setDocument<
  T extends keyof FirestoreCollection,
  G extends FirestoreCollection[T]
>(collection: T, id: string, data: G): Promise<void> {
  await firestore
    .collection(collection)
    .doc(id)
    .set({
      ...data,
      id,
    });
}
