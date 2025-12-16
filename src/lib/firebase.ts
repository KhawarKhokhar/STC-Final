// src/lib/firebase.ts
"use client";

import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Fail fast with a clear message
const required = ["apiKey", "authDomain", "projectId", "databaseURL"] as const;
for (const k of required) {
  if (!firebaseConfig[k]) {
    throw new Error(
      `Missing Firebase config "${k}". Check NEXT_PUBLIC_FIREBASE_${k
        .replace(/[A-Z]/g, m => "_" + m)
        .toUpperCase()}.`
    );
  }
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const rdb = getDatabase(app); 
export const auth = getAuth(app);
export const db = getFirestore(app);
