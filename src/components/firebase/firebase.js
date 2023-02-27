// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA24piGci15bw4_kH1aSZfQlkm9URkLWEE",
  authDomain: "filmymeta-bd3d6.firebaseapp.com",
  projectId: "filmymeta-bd3d6",
  storageBucket: "filmymeta-bd3d6.appspot.com",
  messagingSenderId: "518330017143",
  appId: "1:518330017143:web:50b624073f6be91ac2ad72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db,"Movies")
export const reviewsRef = collection(db,"Reviews")
export default app;