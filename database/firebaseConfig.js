import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApi-DhyDUF7erR3R9DUgI9kFz5E6Rgelg",
  authDomain: "imagigram-e81cb.firebaseapp.com",
  projectId: "imagigram-e81cb",
  storageBucket: "imagigram-e81cb.appspot.com",
  messagingSenderId: "1054293332997",
  appId: "1:1054293332997:web:73ca7600e78deb878b386c",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
