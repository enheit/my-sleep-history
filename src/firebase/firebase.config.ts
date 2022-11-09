import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2NOgQjf4aOxt06WTJ61hqMU2Cd45a3ms",
  authDomain: "my-sleep-history.firebaseapp.com",
  projectId: "my-sleep-history",
  storageBucket: "my-sleep-history.appspot.com",
  messagingSenderId: "377138796014",
  appId: "1:377138796014:web:9ad73eb2eff4423c45aaff",
  measurementId: "G-QQRGBF8FYY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);