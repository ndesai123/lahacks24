import React, { useState } from 'react';
import "./home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';



const Home = () => {
  return (
    <div className='home'>
      <div>
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </div>
      <Outlet />
    </div>
  )
}

export default Home