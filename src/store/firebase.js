import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7ctHykSvO6SMM9Ru23c0bxqqEhtEYhII",
  authDomain: "quickchat-58126.firebaseapp.com",
  projectId: "quickchat-58126",
  storageBucket: "quickchat-58126.appspot.com",
  messagingSenderId: "798322518825",
  appId: "1:798322518825:web:e32a63fc2353b08bfde538",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
