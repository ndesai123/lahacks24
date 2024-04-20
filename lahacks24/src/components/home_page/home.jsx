import React, { useState, useEffect } from 'react';
import "./home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


import { Outlet } from 'react-router-dom';

import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase.js';

const Home = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handlePetsClick = () => {
    navigate("/pets")
  }

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
  


  return (
    <div className='home'>

      <div className='slogan'>
        Mindfulness starts here.
      </div>

      <img className='homeImage' src='frontbanner.png'></img>

      {user ? (
          <Button className="startButton" variant='dark' onClick={handlePetsClick}>
            GET STARTED
          </Button>
        ) : (
          <Button className="startButton" variant='dark' onClick={googleSignIn}>
            GET STARTED
          </Button>
        )}

      <Outlet />
    </div>
  )
}

export default Home