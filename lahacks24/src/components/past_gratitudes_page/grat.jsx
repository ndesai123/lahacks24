import React, { useState } from 'react';
import "./grat.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';

const Gratitudes = () => {
  return (
    <div>
          <div className='titleGrat'>
            <p className='titleText'>Past Gratitudes.</p> 
          </div>   
      <Outlet />
    </div>
  )
}

export default Gratitudes