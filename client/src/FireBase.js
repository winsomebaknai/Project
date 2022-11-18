import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDqDlcOmW0_aRBxx2s4q24HAtnjZlgqClM",
    authDomain: "project-3e83b.firebaseapp.com",
    projectId: "project-3e83b",
    storageBucket: "project-3e83b.appspot.com",
    messagingSenderId: "279352356034",
    appId: "1:279352356034:web:734d3a8627058372661f5b",
    measurementId: "G-0CHMSGFJNL"
  };

  const app = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const db = app.firestore()
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  export {auth, googleProvider};
  export default db;