import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJGm2-U1ZOntXYVRiRD_ZIfOxvaCl5HF4",
  authDomain: "chat-web-fb959.firebaseapp.com",
  projectId: "chat-web-fb959",
  storageBucket: "chat-web-fb959.firebasestorage.app",
  messagingSenderId: "643803924897",
  appId: "1:643803924897:web:0bfa2cb58243ec8b0b23e0",
  measurementId: "G-PMH5XFZ3P4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");

  connectFirestoreEmulator(db, "localhost", 8080);
}

export { db, auth };
export default firebase;
