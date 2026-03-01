import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase/auth";
import { db } from "../firebase";

/* SIGN UP */
export async function signup(email, password, name) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    name,
    email,
    createdAt: serverTimestamp(),
  });

  return cred.user;
}

/* LOGIN */
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/* LOGOUT */
export function logout() {
  return signOut(auth);
}
