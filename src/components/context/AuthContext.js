import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* SIGNUP */
  const signup = async (email, password) => {

    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      email: res.user.email,
      role: "user",
      createdAt: serverTimestamp(),
    });

    return res;
  };

  /* LOGIN */
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* LOGOUT */
  const logout = async () => {
    return signOut(auth);
  };

  /* TRACK USER */
  useEffect(() => {

    const unsub = onAuthStateChanged(auth, async (currentUser) => {

      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }
const userRef = doc(db, "users", currentUser.uid);
const userSnap = await getDoc(userRef);

/* CHECK IF PARTNER */

const partnerRef = doc(db, "partners", currentUser.uid);
const partnerSnap = await getDoc(partnerRef);

let role = "user";

// 1. First check Firestore users collection
if (userSnap.exists()) {
  role = userSnap.data().role || "user";
}

// 2. Override if partner
if (partnerSnap.exists()) {
  role = "partner";
}
if (!userSnap.exists()) {
  await setDoc(userRef, {
    email: currentUser.email,
    role: role,
    createdAt: serverTimestamp(),
  });
}

setUser({
  uid: currentUser.uid,
  email: currentUser.email,
  role
});

setLoading(false);

    });

    return () => unsub();

  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  return useContext(AuthContext);
}
