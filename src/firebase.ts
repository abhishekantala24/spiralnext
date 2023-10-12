import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD4LSbQhtjVRwYCMDMWS1-Z4ee4y9cbvR4",
    authDomain: "spiral-technolabs.firebaseapp.com",
    projectId: "spiral-technolabs",
    storageBucket: "spiral-technolabs.appspot.com",
    messagingSenderId: "215950313600",
    appId: "1:215950313600:web:e232b330ee55f4ccc27e65",
    measurementId: "G-6EB7PV9JK6"
};

initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app