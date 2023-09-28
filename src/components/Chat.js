import React, { Fragment, useState, useRef, useEffect, useCallback } from 'react'
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore/lite';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../store/firebase"
import SignOut from './SignOut';
import styles from "./Chat.module.css"
import profilePic from "../assets/profile.png";

const Chat = () => {
    const inputRef = useRef();
    const scroll = useRef();
    const [messageList, setMessageList] = useState([]);
    const [user] = useAuthState(auth)
    const [userData] = user.providerData;
    const { displayName, photoURL, uid } = userData

    
    const getMessages = useCallback(async () => {
        const messagesCol = collection(db, 'messages');
        const q = query(messagesCol, orderBy('createdAt'), limit(50));
        const messagesSnapshot = await getDocs(q);
        setMessageList(messagesSnapshot.docs.map(doc => doc.data()));
    }, [])
    console.log(messageList)

    useEffect(() => {
        getMessages();
        setTimeout(() => {
            scroll.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 300);
    }, [getMessages])

    const storeMessage = async (message) => {
        try {
            const collectionRef = collection(db, 'messages');
            const docRef = await addDoc(collectionRef, message);
            console.log('Message stored with ID: ', docRef.id);
        } catch (error) {
            console.error('Error storing message: ', error);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const newMessage = {
            createdAt: serverTimestamp(),
            message: inputRef.current.value,
            displayName,
            photoURL,
            uid,
        }
        await storeMessage(newMessage);
        getMessages();
        inputRef.current.value = '';
        console.log("submit handler running")
        setTimeout(() => {
            scroll.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 300);
    }

    return (
        <Fragment>
            <SignOut />
            <div className={styles.container}>
                <main className={styles.chat}>
                    {messageList.map(({ id, uid: userId, message, photoURL, displayName }) => (
                        <div key={id} className={`${styles.chatBox} ${userId === uid ? styles.send : styles.receive}`}>
                            <img src={photoURL} alt={profilePic} className={styles["user-profile"]} />
                            <div className={styles["user-data"]}>
                                <h6>{displayName}</h6>
                                <p>{message}</p>
                            </div>
                        </div>
                    ))}

                    <div ref={scroll} id='bottomDiv'></div>
                </main>
                <footer >
                    <form onSubmit={submitHandler} className={styles["user-input"]}>
                        <input type="text" placeholder='message...' ref={inputRef} />
                        <button type='submit'>Send</button>
                    </form>
                </footer>
            </div>
        </Fragment>
    )
}

export default Chat;
