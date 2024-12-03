import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBJGm2-U1ZOntXYVRiRD_ZIfOxvaCl5HF4",
  authDomain: "chat-web-fb959.firebaseapp.com",
  projectId: "chat-web-fb959",
  storageBucket: "chat-web-fb959.firebasestorage.app",
  messagingSenderId: "643803924897",
  appId: "1:643803924897:web:0bfa2cb58243ec8b0b23e0",
  measurementId: "G-PMH5XFZ3P4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

if (window.location.hostname === "localhost") {
  // auth.useEmulator("http://localhost:9099");
  // db.useEmulator("localhost", "8080");
  // storage.useEmulator("localhost", 9199);
}

export { db, auth, storage };
export default firebase;
