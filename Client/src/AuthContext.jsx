import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./config/firebase"; // your firebase config
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observe Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
    return res.user;
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
