import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmRnWX2PHhDVwfa08NRcuvFdM_AQSt6eI",
  authDomain: "groupchat-2125c.firebaseapp.com",
  projectId: "groupchat-2125c",
  storageBucket: "groupchat-2125c.appspot.com",
  messagingSenderId: "457920578190",
  appId: "1:457920578190:web:056d2f58f45af7bc0ebfdf"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
