import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA7yY1UvqWT9HCTOBiK6yBP_xoLc6wFR0A',
    authDomain: 'chat-app-reactjs-6d83b.firebaseapp.com',
    projectId: 'chat-app-reactjs-6d83b',
    storageBucket: 'chat-app-reactjs-6d83b.appspot.com',
    messagingSenderId: '935556442736',
    appId: '1:935556442736:web:d06a022d7a2082e193a2b5',
    measurementId: 'G-FTL0WNKHG1'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//     db.useEmulator('localhost', '8080');
// }

export { db, auth };
export default firebase;
