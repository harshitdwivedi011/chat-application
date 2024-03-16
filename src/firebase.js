import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyA-S3tZXzPk2kT04b1knFN8qVcdh3vRAbA",
    authDomain: "chat-application-2be48.firebaseapp.com",
    projectId: "chat-application-2be48",
    storageBucket: "chat-application-2be48.appspot.com",
    messagingSenderId: "348212887038",
    appId: "1:348212887038:web:0cd5ab77f1651b9874d4af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();