// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSQSn7g0Nry779JY0JiNN8PlLrEvJhsxE",
  authDomain: "login-auth-e795b.firebaseapp.com",
  projectId: "login-auth-e795b",
  storageBucket: "login-auth-e795b.firebasestorage.app",
  messagingSenderId: "486228407065",
  appId: "1:486228407065:web:beefe12228a3b7a82f8b88",
  measurementId: "G-C35PLNT9MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
const auth = getAuth(app);
export { auth };