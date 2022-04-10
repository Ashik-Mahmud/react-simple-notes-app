// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh8NJrQJn1xHO23ZSQ9o8778LAUDk5Ifw",
  authDomain: "notes-app-d645c.firebaseapp.com",
  projectId: "notes-app-d645c",
  storageBucket: "notes-app-d645c.appspot.com",
  messagingSenderId: "504754776021",
  appId: "1:504754776021:web:2d56228c5c8288a8daff5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);