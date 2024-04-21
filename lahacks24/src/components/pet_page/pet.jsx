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
      <div className="centered text-position"> {/* Changed class to className */}
        <p className="font-size position-daily">Daily goal: X/3 </p>
        <p className="font-size position-lifetime">Lifetime: XX </p>
        <img className="img-size position-duck" src="adult_duck.PNG" alt="Duck"></img> {/* Added alt attribute */}
        <div className="button-container font-size-button">
          <button className="position-image position-leftbutton">SUBMIT GRATITUDE</button>
          <button className="position-image position-rightbutton" onClick={handleGratClick}>PAST GRATITUDES</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Pets;
