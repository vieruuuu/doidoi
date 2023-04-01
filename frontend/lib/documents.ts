import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { uid } from "uid";

import { firebaseStorage } from "@/lib/firebase";

export async function uploadFile(userId: string, file: File) {
  const imagePath = `/images/${userId}/${uid() + file.name}`;
  const fileRef = storageRef(firebaseStorage, imagePath);

  await uploadBytes(fileRef, file);
  const downloadUrl = await getDownloadURL(fileRef);

  return downloadUrl;
}
