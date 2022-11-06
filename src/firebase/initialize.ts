// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2NOgQjf4aOxt06WTJ61hqMU2Cd45a3ms",
  authDomain: "my-sleep-history.firebaseapp.com",
  projectId: "my-sleep-history",
  storageBucket: "my-sleep-history.appspot.com",
  messagingSenderId: "377138796014",
  appId: "1:377138796014:web:9ad73eb2eff4423c45aaff",
  measurementId: "G-QQRGBF8FYY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Analytics
// export const analytics = getAnalytics(app);

// Authentication
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => { })
  .catch(error => {
    console.log("error");
  })

// Google Auth Provider
export const provider = new GoogleAuthProvider();
