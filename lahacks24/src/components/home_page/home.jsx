import React, { useState } from 'react';
import "./home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';



const Home = () => {

  

  return (
    <div className='home'>

      <div className='slogan'>
        Mindfulness starts here.
      </div>

      <img className='homeImage' src='frontbanner.png'></img>

      <Button className="startButton" variant='dark' onClick=''>
        GET STARTED
      </Button>

      <Outlet />
    </div>
  )
}

export default Home