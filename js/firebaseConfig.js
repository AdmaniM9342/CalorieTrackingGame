// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInAnonymously,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    collection,
    query,
    orderBy,
    limit,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js ";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7Xr7jn8NYnWTk1mHf7GxoAMvJBq1oU_4",
  authDomain: "caloriesgame-22141.firebaseapp.com",
  projectId: "caloriesgame-22141",
  storageBucket: "caloriesgame-22141.firebasestorage.app",
  messagingSenderId: "1069259901872",
  appId: "1:1069259901872:web:0e4dd84b7a32ec85e42475",
  measurementId: "G-QCTCYZMD54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
  app,
  auth,
  db,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
};