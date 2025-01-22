import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_APIKEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VTE_FIREBASE_MESSAGINGSENDERID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APPID}`,
  measurementId: `${import.meta.env.VIRE_FIREBASE_MEASUREMENTID}`,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export { auth };
