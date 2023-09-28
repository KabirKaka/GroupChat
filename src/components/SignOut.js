import React from 'react'
import { auth } from '../store/firebase';
import "./SignOut.module.css"



function SignOut() {

    const signOutHandler = () =>{
        auth.signOut();
        console.log("SignOut Successfull")
    }

    return (
        <nav>
            <h1>GroupChat</h1>
            <button onClick={signOutHandler}>SignOut</button>
        </nav>
    )
}

export default SignOut;
