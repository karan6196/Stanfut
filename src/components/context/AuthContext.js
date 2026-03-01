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

      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {

        await setDoc(ref, {
          email: currentUser.email,
          role: "user",
          createdAt: serverTimestamp(),
        });

      }

      setUser(currentUser);
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
