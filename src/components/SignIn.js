import React from 'react'
import styles from "./SignIn.module.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../store/firebase"



function SignIn() {
    const signInHandler = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>GroupChat</h1>
                <button onClick={signInHandler}>SignIn with Google</button>
            </div>
        </div>
    )
}

export default SignIn;
