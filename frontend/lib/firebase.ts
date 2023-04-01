import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  indexedDBLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeFirestore } from "firebase/firestore/lite";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { fetchDocument } from "./firestore";
import { Router } from "@/router";

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
});

export const firestore = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});

export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: [
    indexedDBLocalPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
  ],
});

export const firebaseStorage = getStorage(firebaseApp);

export const firebaseFunctions = getFunctions(firebaseApp, "europe-central2");

if (import.meta.env.DEV) {
  connectFunctionsEmulator(firebaseFunctions, "localhost", 5001);
}

export function loginHook() {
  const { setUser } = useAuthStore();

  Router.push("/");

  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user && user.email) {
      const userData = await fetchDocument("users", user.uid);

      setUser(userData);
    } else {
      setUser();
    }
  });
}
