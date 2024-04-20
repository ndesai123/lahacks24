import React, { useState } from 'react';
import "./grat.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';



const Gratitudes = () => {
  return (
    <div>
      <div>
          <div className='title'>
            <p className='titleText'>Past Gratitudes.</p>
          </div>
        <div class="columns-container">
          <div class="column">
            <p>MM/DD/YYYY</p>
          </div>
          <div class="column">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
          </div>
        </div>

        <div class="columns-container">
          <div class="column">
            <p>MM/DD/YYYY</p>
          </div>
          <div class="column">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
          </div>
        </div>

      </div>
      <Outlet />
    </div>
  )
}

export default Gratitudes