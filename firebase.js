// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPYNGmTQ1vQgp2nnFPRwd3U1Scpjwn_Cc",
  authDomain: "disney-hotstar-clone-29a05.firebaseapp.com",
  projectId: "disney-hotstar-clone-29a05",
  storageBucket: "disney-hotstar-clone-29a05.appspot.com",
  messagingSenderId: "725601176148",
  appId: "1:725601176148:web:de79afe937eb30b2b8fbc1",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
