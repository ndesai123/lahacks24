import React from 'react';
import "./pet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
        <Popup className="submitPopup position-image position-leftbutton" trigger={<button>SUBMIT GRATITUDE</button>} modal nested>
          {closed => (
            <div>
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </div>
            )}
          </Popup>
          <button className="position-image position-rightbutton" onClick={handleGratClick}>PAST GRATITUDES</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Pets;
