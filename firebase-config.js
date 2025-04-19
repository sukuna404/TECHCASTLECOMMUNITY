// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2iW6edk-lIpApB_UsyFp3n-fQpXKJ50s",
  authDomain: "tcc-web-e7768.firebaseapp.com",
  projectId: "tcc-web-e7768",
  storageBucket: "tcc-web-e7768.firebasestorage.app",
  messagingSenderId: "564717300150",
  appId: "1:564717300150:web:ec694a578e1d5356a77917",
  measurementId: "G-7NLTRXFDHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };