# GroupChat · Real-time Group Chat

A real-time group chat app built with React and Firebase. Sign in with Google and chat with everyone in the room instantly.

**Live demo:** https://group-chat-messanger-app.vercel.app/

## Features

- Google sign-in with Firebase Authentication
- Live message stream from Cloud Firestore (`onSnapshot`, latest 50 messages, ordered by time)
- Messages stamped with server timestamps
- On sign-out, users can choose to delete their messages, which disappear for everyone in real time

## Tech stack

- React
- Firebase Authentication
- Cloud Firestore
- react-firebase-hooks
- CSS Modules

## Getting started

Add your Firebase project config in `src/store/firebase.js`, then:

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

## Project structure

```
src/
├── components/   # Chat, SignIn, SignOut
└── store/        # firebase.js (app, auth, db)
```


## Author

**Muhammad Kabir Kaka**, Frontend Engineer (React · Next.js · TypeScript)  
[GitHub](https://github.com/KabirKaka) · [LinkedIn](https://www.linkedin.com/in/muhammad-kabir-kaka)
