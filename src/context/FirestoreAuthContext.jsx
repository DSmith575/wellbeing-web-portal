import { createContext, useContext, useEffect, useState } from 'react';
import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

const FirestoreAuthContext = createContext();

const useUserAuth = () => {
  return useContext(FirestoreAuthContext);
};

const FirestoreAuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const logout = () => {
    return signOut(auth);
  };

  const login = (email, password) => {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Incorrect email or password');
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      user ? setUser(user.uid) : setUser(null);
    });
  }, []);

  return (
    <FirestoreAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </FirestoreAuthContext.Provider>
  );
};

export { FirestoreAuthProvider, useUserAuth };
