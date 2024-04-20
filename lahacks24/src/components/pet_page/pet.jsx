import React, { useState } from 'react';
import "./pet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';



const Pets = () => {
  return (
    <div>
      <div>
        PETS
      </div>
      <Outlet />
    </div>
  )
}

export default Pets