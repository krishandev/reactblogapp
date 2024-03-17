// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "reactblog-89556.firebaseapp.com",
  projectId: "reactblog-89556",
  storageBucket: "reactblog-89556.appspot.com",
  messagingSenderId: "195064726794",
  appId: "1:195064726794:web:2b126914e45b5b2423e6f3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
