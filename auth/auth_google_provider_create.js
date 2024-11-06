import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import "./firebaseConfig";

export async function signIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.log("Sign in error: ", error);
    throw error;
  }
}

export async function logOut() {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}
