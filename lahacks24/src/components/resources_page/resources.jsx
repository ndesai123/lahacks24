import React, { useState } from 'react';
import "./resources.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';



const Resources = () => {
  return (
    <div>
      <div>
        RESOURCES
      </div>
      <Outlet />
    </div>
  )
}

export default Resources