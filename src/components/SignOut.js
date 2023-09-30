import React, { useState } from 'react'
import { db, auth } from '../store/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import styles from "./SignOut.module.css";



function SignOut({ userId, usersDataList }) {
    const [showDialog, setShowDialog] = useState(false)

    const signOutHandler = () => {
        console.log("signout handler running")
        setShowDialog((prevState)=> !prevState);
    }

    const deleteUserMessagesFromDB = () => {
        console.log("delete message handler running")
        console.log(usersDataList)
        console.log(userId)
        const currentUserData = usersDataList.filter((data) => data.uid === userId)
        console.log(currentUserData)
        currentUserData.map(async (data) => {
            await deleteDoc(doc(db, "chatmessages", data.id));
        })
        console.log("your data is successfully deleted!")
        setShowDialog(false)
        signOut();
    }
    
    const signOut = () =>{
        console.log("signout functiion")
        auth.signOut();
    }

    const dialogBoxClasses = `${styles.ConfirmDialogBox}  ${showDialog? styles.appearBox : ""}`
    return (
        <nav>
            <h1>GroupChat</h1>
            <button onClick={signOutHandler}>SignOut</button>
            <div className={dialogBoxClasses}>
                <p >
                    Do you want to delete your chat data from the database to ensure it's not visible to others?
                </p>
                <p className={styles["remember-text"]}>Please remember, it will not be shown to you later.</p>
                <div className={styles.buttons}>
                    <button onClick={deleteUserMessagesFromDB}>Yes</button>
                    <button onClick={signOut}>No</button>
                </div>
            </div>
        </nav>
    )
}

export default SignOut;
