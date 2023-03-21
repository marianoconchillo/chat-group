import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbLKkvTXmtMxV5W72SffYwqJL87TG40Yo",
    authDomain: "chat-group-8afec.firebaseapp.com",
    projectId: "chat-group-8afec",
    storageBucket: "chat-group-8afec.appspot.com",
    messagingSenderId: "333034174440",
    appId: "1:333034174440:web:131f32c91464d8ccd7965d",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
