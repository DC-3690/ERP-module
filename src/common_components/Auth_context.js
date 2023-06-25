import React, { createContext, useEffect, useState } from "react";
import { Auth } from "../firebase/firebase_con";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const Authcont = createContext();

function Auth_context({ children }) {
  const [currentuser, setcurrentuser] = useState();
  const [flag, setflag] = useState(0);

  const value = { currentuser, signup, signin, logout, forgotpassword, verify };

  function signup(email, password) {
    return createUserWithEmailAndPassword(Auth, email, password);
  }
  function verify(email) {
    return sendEmailVerification(email);
  }

  function signin(email, password) {
    setflag(1);
    return signInWithEmailAndPassword(Auth, email, password);
  }

  function forgotpassword(email) {
    return sendPasswordResetEmail(Auth, email);
  }

  function logout() {
    return signOut(Auth);
  }

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged((user) => {
      setcurrentuser(user);
    });

    return unsubscribe;
  }, []);

  return <Authcont.Provider value={value}>{children}</Authcont.Provider>;
}

export default Auth_context;
