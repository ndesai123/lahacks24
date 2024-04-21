import React, { useState, useEffect } from 'react';
import "./pet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { auth, db } from '../../firebase.js';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

import { Outlet } from 'react-router-dom';

const Pets = () => {
  const navigate = useNavigate();
  const [gratitude, setGratitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [dailyGoal, setDailyGoal] = useState(0); // State to store the daily goal
  const [user, setUser] = useState(null); // State to store the current user

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the current user if logged in
      } else {
        setUser(null); // Set user to null if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from auth state changes
  }, []);

  useEffect(() => {
    const fetchDailyGoal = async () => {
      if (!user) {
        setError('User not signed in.');
        return;
      }

      try {
        const q = query(collection(db, "entry"), where("owner", "==", user.uid), where("date", "==", formattedDate));
        const querySnapshot = await getDocs(q);
        const count = querySnapshot.size;
        setDailyGoal(count);
      } catch (error) {
        console.error('Error fetching daily goal:', error);
        setError('Failed to fetch daily goal. Please try again.'); 
      }
    };

    if (user) {
      fetchDailyGoal(); // Fetch daily goal only if user is logged in
    }
  }, [user, formattedDate]); // Fetch daily goal whenever user or formattedDate changes

  const handleGratClick = () => {
    navigate("/gratitudes");
  }

  const handleChange = (event) => {
    setGratitude(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        <p className="font-size position-daily">Daily goal: {dailyGoal}/3 </p> {/* Display daily goal */}
        <p className="font-size position-lifetime">Lifetime: XX </p>
        <img className="img-size position-duck" src="adult_duck.PNG" alt="Duck" />
        <div className="button-container font-size-button">

          <Popup className="submitPopup" trigger={<button className="position-leftbutton" disabled={loading || !user}>SUBMIT GRATITUDE</button>}{...{contentStyle}} modal nested>
            {closed => (
              <div>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="gratitudeInput">What are you grateful for?</label>
                  <input type="text" id="gratitudeInput" name="gratitude" value={gratitude} onChange={handleChange} required />
                  {error && <p className="error-message">{error}</p>} {/* Display error message */}
                  <button type="submit" disabled={loading || !user}>Submit</button> {/* Disable button during loading or if user is not logged in */}
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
