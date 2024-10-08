// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apikey = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: apikey,
  authDomain: "ncaward-e618d.firebaseapp.com",
  databaseURL: "https://ncaward-e618d-default-rtdb.firebaseio.com",
  projectId: "ncaward-e618d",
  storageBucket: "ncaward-e618d.appspot.com",
  messagingSenderId: "278502088799",
  appId: "1:278502088799:web:fddb59ab326e0950e23bea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)