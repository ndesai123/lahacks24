import React, { useState } from 'react';
import "./pet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { auth, db } from '../../firebase.js';
import { collection, addDoc } from "firebase/firestore"; 

import { Outlet } from 'react-router-dom';

const Pets = () => {
  const navigate = useNavigate();
  const [gratitude, setGratitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const handleGratClick = () => {
    navigate("/gratitudes");
  }

  const handleChange = (event) => {
    setGratitude(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      setError('User not signed in.');
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "entry"), {
        date: formattedDate,
        gratitude,
        owner: user.uid
      });
      console.log('Event data stored successfully with ID:', docRef.id);
      setLoading(false);
      navigate('/submitted');
    } catch (error) {
      console.error('Error storing event data:', error);
      setError('Failed to submit gratitude. Please try again.'); 
      setLoading(false);
    }
  };

  const contentStyle = {background: '#F6FAEB'}

  return (
    <div>
      <div className="centered text-position">
        <p className="font-size position-daily">Daily goal: X/3 </p>
        <p className="font-size position-lifetime">Lifetime: XX </p>
        <img className="img-size position-duck" src="adult_duck.PNG" alt="Duck" />
        <div className="button-container font-size-button">

          <Popup className="submitPopup" trigger={<button className="position-leftbutton" disabled={loading}>SUBMIT GRATITUDE</button>}{...{contentStyle}} modal nested>
            {closed => (
              <div>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="gratitudeInput">What are you grateful for?</label>
                  <input type="text" id="gratitudeInput" name="gratitude" value={gratitude} onChange={handleChange} required />
                  {error && <p className="error-message">{error}</p>} {/* Display error message */}
                  <button type="submit" disabled={loading}>Submit</button> {/* Disable button during loading */}
                </form>
              </div>

            )}
          </Popup>
          <button className="position-rightbutton" onClick={handleGratClick}>PAST GRATITUDES</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Pets;
