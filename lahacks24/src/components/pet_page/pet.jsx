import React from 'react';
import "./pet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import { Outlet } from 'react-router-dom';

const Pets = () => {
  const navigate = useNavigate(); // Calling useNavigate hook directly inside the component

  const handleGratClick = () => {
    navigate("/gratitudes"); // Using the navigate function obtained from useNavigate
  }

  return (
    <div>
      <div className="centered"> {/* Changed class to className */}
        <p>Daily goal: X/3 </p>
        <p>Lifetime: XX </p>
        <img className="img-size" src="adult_duck.PNG" alt="Duck"></img> {/* Added alt attribute */}
        <div>
          <button>SUBMIT GRATITUDE</button>
          <button onClick={handleGratClick}>PAST GRATITUDES</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Pets;
