import React, { useState } from 'react';
import "./about.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';


const About = () => {
  return (
    <div>
      <div>
        <h1 className="title">
          <span className="about"></span> <span className="long-words"></span>
        </h1>
      </div>
      <Outlet />
    </div>
  )
}

export default About