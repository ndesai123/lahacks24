import React, { useState } from 'react';
import "./navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';



const Navbar = () => {
    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate("/")
    }
    
    const handleAboutClick = () => {
      navigate("/about")
    }
  return (
    <div>
      <div className="navbar">
        <div className="navtabs">
            <p className="logo">Wellness Waddle</p>
            <Button variant="link"><p onClick={handleHomeClick}>Home</p></Button>
            <Button variant="link"><p>test</p></Button>
            <Button variant="link"><p>test</p></Button>
            <Button variant="link"><p onClick={handleAboutClick}>About</p></Button>
            {(
              <Button variant="link"><p>Login</p></Button>
            )} 
            {(
              <Button variant="link"><p>Sign Up</p></Button>
            )} 
            
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Navbar