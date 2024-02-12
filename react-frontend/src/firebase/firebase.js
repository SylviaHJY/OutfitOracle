// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let REACT_APP_FIREBASE_KEY = "AIzaSyAIghO7rQFEE_UkSiSVs6w270xluJrRklg"
let REACT_APP_FIREBASE_DOMAIN = "wardrobe-wizard-105dd.firebaseapp.com"
let REACT_APP_FIREBASE_PROJECT_ID =  "wardrobe-wizard-105dd"
let REACT_APP_FIREBASE_STORAGE_BUCKET = "wardrobe-wizard-105dd.appspot.com"
let REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "774489341943"
let REACT_APP_FIREBASE_APP_ID = "1:774489341943:web:ed922dd070df4f8e41f8f2"

const app = initializeApp({
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
});

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAIghO7rQFEE_UkSiSVs6w270xluJrRklg",
//   authDomain: "wardrobe-wizard-105dd.firebaseapp.com",
//   projectId: "wardrobe-wizard-105dd",
//   storageBucket: "wardrobe-wizard-105dd.appspot.com",
//   messagingSenderId: "774489341943",
//   appId: "1:774489341943:web:ed922dd070df4f8e41f8f2"
// };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;