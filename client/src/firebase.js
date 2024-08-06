// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "blog-app-fc085.firebaseapp.com",
  projectId: "blog-app-fc085",
  storageBucket: "blog-app-fc085.appspot.com",
  messagingSenderId: "258631269819",
  appId: "1:258631269819:web:3ed058e2f14ed62dbc189e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);