import React, { Fragment, useState, useRef, useEffect } from 'react'
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore/lite';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../store/firebase"
import SignOut from './SignOut';
import styles from "./Chat.module.css"
import profilePic from "../assets/profile.png";

const Chat = () => {
    const scroll = useRef();
    const [messageList, setMessageList] = useState([]);
    const [msg, setMsg] = useState("");
    const [user] = useAuthState(auth)
    const [userData] = user.providerData;
    const { displayName, photoURL, uid } = userData;

    console.log("chat running")
    const getMessages = async () => {
        console.log("get message from firebase")
        const messagesCol = collection(db, 'messages');
        const q = query(messagesCol, orderBy('createdAt'), limit(50));
        const messagesSnapshot = await getDocs(q);
        setMessageList(messagesSnapshot.docs.map(doc => doc.data()));
        setTimeout(() => {
            scroll.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 500);
    }

    useEffect(() => {
        getMessages();
    }, [])

    const storeMessage = async (message) => {
        try {
            const collectionRef = collection(db, 'messages');
            const docRef = await addDoc(collectionRef, message);
            console.log('Message stored with ID: ', docRef.id);
        } catch (error) {
            console.error('Error storing message: ', error);
        }
        setMsg("")
        getMessages();
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(msg === ""){
            return
        }
        const newMessage = {
            createdAt: serverTimestamp(),
            message: msg,
            displayName,
            photoURL,
            uid,
        }
        storeMessage(newMessage);
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
                        <input type="text" placeholder='message...' value={msg} onChange={event =>
                            setMsg(event.target.value)} />
                        <button type='submit'>Send</button>
                    </form>
                </footer>
            </div>
        </Fragment>
    )
}

export default Chat;
