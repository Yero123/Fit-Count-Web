// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeFeTiK6t6Xdcga9qH2M1GCsmNViROjBc",
  authDomain: "fit-count-72aaa.firebaseapp.com",
  projectId: "fit-count-72aaa",
  storageBucket: "fit-count-72aaa.appspot.com",
  messagingSenderId: "30219235543",
  appId: "1:30219235543:web:4717c4981055816c990092",
  measurementId: "G-JD90SK8M1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
