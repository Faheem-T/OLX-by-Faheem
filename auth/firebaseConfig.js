// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJjklODFgBYPMF3B4Hw1yum43SVfS388o",
  authDomain: "olx-clone-9bf35.firebaseapp.com",
  projectId: "olx-clone-9bf35",
  storageBucket: "olx-clone-9bf35.firebasestorage.app",
  messagingSenderId: "379856022676",
  appId: "1:379856022676:web:353160c94639ce121ad881",
  measurementId: "G-JEMD3RQ9L2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
