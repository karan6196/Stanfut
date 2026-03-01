// firebase.js

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage"; // ✅ ADD THIS


const firebaseConfig = {
  apiKey: "AIzaSyDTV68K_ZIRkyP24hXO3vNN7DWf4hgT7AA",
  authDomain: "stanfut-2caf7.firebaseapp.com",
  projectId: "stanfut-2caf7",
  storageBucket: "stanfut-2caf7.firebasestorage.app",
  messagingSenderId: "424108516136",
  appId: "1:424108516136:web:906adba194cbac9bcee61d"
};


// Initialize app
const app = initializeApp(firebaseConfig);


// Export services
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app); // ✅ THIS FIXES YOUR ERROR
