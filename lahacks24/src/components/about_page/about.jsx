import React, { useState } from 'react';
import "./about.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';



const About = () => {
  return (
    <div style={{ backgroundColor: '#F6FAEB' }}>
      <div>
        <h1 style={{ textAlign: 'center' }}>About Us</h1>
      </div>
      <Outlet />
    </div>
  )
}

export default About