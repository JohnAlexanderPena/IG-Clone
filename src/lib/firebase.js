import Firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: 'ig-clone-9928f.firebaseapp.com',
  projectId: 'ig-clone-9928f',
  storageBucket: 'ig-clone-9928f.appspot.com',
  messagingSenderId: '939277630417',
  appId: process.env.REACT_APP_FIREBASE_USER_ID
};

const firebase = Firebase.initializeApp(config);

console.log('firebase', firebase);

const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
