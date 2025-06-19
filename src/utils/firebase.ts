// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtBs03XyaZWA1IkcqOxhXbU_2XDEyz8Ag",
  authDomain: "mycontent-df02d.firebaseapp.com",
  projectId: "mycontent-df02d",
  storageBucket: "mycontent-df02d.firebasestorage.app",
  messagingSenderId: "607094278140",
  appId: "1:607094278140:web:cbd950cd0f57a9e6a81479",
  measurementId: "G-6RZ78FWZV9"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const firestore = getFirestore(app)