// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDTDKK7a-KCSjuUUCESKzhvNdgWlUi6KMI",
  authDomain: "practice-cf888.firebaseapp.com",
  projectId: "practice-cf888",
  storageBucket: "practice-cf888.appspot.com",
  messagingSenderId: "456704734078",
  appId: "1:456704734078:web:2bb1a1abb5af8c548af92f",
  measurementId: "G-KTBV425R7W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const Auth = getAuth(app);
