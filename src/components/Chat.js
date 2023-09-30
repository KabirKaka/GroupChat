import React, { Fragment, useState, useRef, useEffect, useCallback } from 'react';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy, limit } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../store/firebase";
import SignOut from './SignOut';
import styles from "./Chat.module.css";
import profilePic from "../assets/profile.png";

const Chat = () => {
    const scroll = useRef();
    const [messageList, setMessageList] = useState([]);
    const [msg, setMsg] = useState("");
    const [user] = useAuthState(auth);
    const [userData] = user.providerData;
    const { displayName, photoURL, uid } = userData;

    const getMessages = useCallback(() => {
        const q = query(collection(db, "chatmessages"), orderBy("createdAt"), limit(50));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                const data = {
                    id: doc.id,
                    ...doc.data()
                }
                messages.push(data);
            });
            setMessageList(messages);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
    if (messageList.length > 0) {
        scroll.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }},[messageList.length])

    useEffect(() => {
        const unsubscribe = getMessages();
        return () => unsubscribe();
    }, [getMessages]);

    const storeMessage = async () => {
        try {
            const collectionRef = collection(db, 'chatmessages');
            await addDoc(collectionRef, {
                createdAt: serverTimestamp(),
                message: msg,
                displayName,
                photoURL,
                uid,
            });
        } catch (error) {
            console.error('Error storing message: ', error);
        }
        setMsg("");
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (msg === "") {
            return;
        }
        storeMessage();
    }

    return (
        <Fragment>
            <SignOut usersDataList={messageList} userId={uid} />
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

                    <div ref={scroll} id='bottomDiv' ></div>
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
