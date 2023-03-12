import { firebaseApp } from "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export async function registerUser(
  firstname: string,
  lastname: string,
  email: string,
  password: string
) {
  try {
    //register user to auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //save user profile to firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstname,
      lastname,
      photoUrl:
        "https://images.unsplash.com/photo-1678436748951-ef6d381e7a25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
      role: "member",
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}