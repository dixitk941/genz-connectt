// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0AfFZBR-BJZPSNsp11jBkhy7d3TV7rEM",
  authDomain: "notesapp-dixitk941.firebaseapp.com",
  projectId: "notesapp-dixitk941",
  storageBucket: "notesapp-dixitk941.appspot.com",
  messagingSenderId: "702011833511",
  appId: "1:702011833511:web:e1b4a6feffeb1a37736f82",
  measurementId: "G-P6R1JZNXHS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
