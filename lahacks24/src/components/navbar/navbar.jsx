import React, { useState, useEffect } from 'react';
import "./navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase.js';

const Navbar = () => {

  const navigate = useNavigate();
    
  const handleHomeClick = () => {
    navigate("/")
  }
  
  const handleAboutClick = () => {
    navigate("/about")
  }

  const handleResourceClick = () => {
    navigate("/resources")
  }

  const handlePetsClick = () => {
    navigate("/pets")
  }

  const handleGratClick = () => {
    navigate("/gratitudes")
  }
  
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
            <Button variant="link" className="logo"><p onClick={handleHomeClick}>Wellness Waddle</p></Button>
            
            {user ? (
                <Button variant="link"><p onClick={handlePetsClick}>Pets</p></Button>
            ) : (
              <></>
            )}

            {user ? (
                <Button variant="link"><p onClick={handleGratClick}>Past Gratitudes</p></Button>
            ) : (
              <></>
            )}

            <Button variant="link"><p onClick={handleResourceClick}>Resources</p></Button>
            <Button variant="link"><p onClick={handleAboutClick}>About</p></Button>
            {user ? (
              <Button variant='standard' onClick={signOutGoogle}>
                <p>Sign Out</p>
              </Button>
            ) : (
              <Button variant='standard' onClick={googleSignIn}>
                <p>Login/Sign Up</p>
              </Button>
            )}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Navbar