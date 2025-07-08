import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyDK61Bl3skSS2He3Va5mws3cJCgt_yHVQw",
  authDomain: "ensinaae-6bb52.firebaseapp.com",
  projectId: "ensinaae-6bb52",
  storageBucket: "ensinaae-6bb52.firebasestorage.app",
  messagingSenderId: "823042371307",
  appId: "1:823042371307:web:1fe75f8d1d3730c8f2d8ae",
  measurementId: "G-PZ2RZKFDFJ"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db, storage };






