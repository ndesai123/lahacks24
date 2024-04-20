import React, { useState, useEffect } from 'react';
import "./navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';


import { auth, googleProvider } from '../../firebase.js';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
      })
      .catch((error) => {
      });
  };
  
  const signOutGoogle = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <div className="navbar">
        <div className="navtabs">
            <p className="logo">Wellness Waddle</p>
            <Button variant="link"><p>Home</p></Button>
            <Button variant="link"><p>test</p></Button>
            <Button variant="link"><p>test</p></Button>
            <Button variant="link"><p>test</p></Button>
            {user ? (
              <Button variant='standard' onClick={signOutGoogle}>
                Sign Out
              </Button>
            ) : (
              <Button variant='standard' onClick={googleSignIn}>
                Login/Sign Up
              </Button>
            )}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Navbar;