import React, { useState } from 'react';
import "./pet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';



const Pets = () => {
  return (
    <div>
      <div class="centered">
        <p>Daily goal: X/3 </p>
        <p>Lifetime: XX </p>
        <img class="img-size" src="adult_duck.PNG"></img>
      </div>
      <Outlet />
    </div>
  )
}

export default Pets