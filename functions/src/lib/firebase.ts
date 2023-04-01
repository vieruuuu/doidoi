import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import * as functions from "firebase-functions";

import vision from "@google-cloud/vision";

export const { logger } = functions;

export const newFunction = functions.region("europe-central2");

export const firebase = initializeApp();

export const firestore = getFirestore(firebase);

firestore.settings({
  ignoreUndefinedProperties: true,
});

export const storage = getStorage(firebase);

export const firebaseAuth = getAuth(firebase);

export const visionClient = new vision.ImageAnnotatorClient({
  credentials: {
    private_key: process.env.VISION_PRIVATE_KEY,
    client_id: process.env.VISION_CLIENT_ID,
    client_email: process.env.VISION_CLIENT_EMAIL,
  },
});
