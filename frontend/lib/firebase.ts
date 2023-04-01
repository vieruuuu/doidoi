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

export const firebase = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
});

export const firestore = initializeFirestore(firebase, {
  ignoreUndefinedProperties: true,
});

export const firebaseAuth = initializeAuth(firebase, {
  persistence: [
    indexedDBLocalPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
  ],
});

export const firebaseFunctions = getFunctions(firebase, "europe-central2");

if (import.meta.env.DEV) {
  connectFunctionsEmulator(firebaseFunctions, "localhost", 5001);
}

export function loginHook() {
  const { setUser } = useAuthStore();

  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user && user.email) {
      setUser({
        id: user.uid,
        email: user.email,
      });
    } else {
      setUser();
    }
  });
}
