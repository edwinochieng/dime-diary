import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function signupUser(
  name: string,
  email: string,
  password: string
) {
  try {
    console.log("Email:", email);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = {
      uid: user.uid,
      email: user.email,
      name,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", user.uid), userDoc);

    return { success: true, user: userDoc };
  } catch (error) {
    console.error("Error signing up user:", error);
    return { success: false, error };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return { success: true, user };
  } catch (error) {
    console.error("Error logging in user:", error);
    return { success: false, error };
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
