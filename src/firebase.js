import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);
export default app;