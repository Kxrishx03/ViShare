import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

// Load Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vishre-9c67d.firebaseapp.com",
  projectId: "vishre-9c67d",
  storageBucket: "vishre-9c67d.appspot.com",
  messagingSenderId: "289545325787",
  appId: "1:289545325787:web:3befeb9bee1296df6090fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();


export default app;
