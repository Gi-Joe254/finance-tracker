// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_jwUbLL5Nb2tCeknfsgpYpQq-TnlyA5g",
  authDomain: "finance-tracker-75f72.firebaseapp.com",
  projectId: "finance-tracker-75f72",
  storageBucket: "finance-tracker-75f72.firebasestorage.app",
  messagingSenderId: "430265492108",
  appId: "1:430265492108:web:d9bee520d869148bed11a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
