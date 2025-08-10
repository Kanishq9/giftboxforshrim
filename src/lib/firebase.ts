// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCaAf75LnAQZjWmc_ZLHoZ641O1fXtppQ",
  authDomain: "giftbox-6edb2.firebaseapp.com",
  projectId: "giftbox-6edb2",
  storageBucket: "giftbox-6edb2.firebasestorage.app",
  messagingSenderId: "822800518256",
  appId: "1:822800518256:web:56b64f0cd324b367c838b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
