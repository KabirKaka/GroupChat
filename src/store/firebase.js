import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBS46kD0gqZval_olLoqTJSd9s3SKkMeJU",
  authDomain: "groupchat-8693b.firebaseapp.com",
  projectId: "groupchat-8693b",
  storageBucket: "groupchat-8693b.appspot.com",
  messagingSenderId: "795344716500",
  appId: "1:795344716500:web:73e8e56470df1a84e1b141"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
