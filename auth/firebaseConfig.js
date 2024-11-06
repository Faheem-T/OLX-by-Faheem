// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwxUGKHIZWZH4FNUgaShbyU855hMc9kjw",
  authDomain: "netflix-clone-4b12c.firebaseapp.com",
  projectId: "netflix-clone-4b12c",
  storageBucket: "netflix-clone-4b12c.firebasestorage.app",
  messagingSenderId: "423567362858",
  appId: "1:423567362858:web:5222c37c456204043bec53",
  measurementId: "G-2HNBCRPHJC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
