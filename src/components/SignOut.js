import React, { useState } from 'react'
import { db, auth } from '../store/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import styles from "./SignOut.module.css";



function SignOut({ userId, usersDataList }) {
    const [showDialog, setShowDialog] = useState(false)

    const signOutHandler = () => {
        setShowDialog((prevState)=> !prevState);
    }

    const deleteUserMessagesFromDB = () => {
        const currentUserData = usersDataList.filter((data) => data.uid === userId)
        currentUserData.map(async (data) => {
            await deleteDoc(doc(db, "chatmessages", data.id));
        })
        setShowDialog(false)
        signOut();
    }
    
    const signOut = () =>{
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
