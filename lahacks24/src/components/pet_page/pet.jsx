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
  const [dailyGoal, setDailyGoal] = useState(0); 
  const [lifetimeGratitudes, setLifetimeGratitudes] = useState(0); 
  const [user, setUser] = useState(null); 

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDailyGoal = async () => {
      if (!user) {
        setError('User not signed in.');
        return;
      }

      try {
        const dailyGoalQuery = query(collection(db, "entry"), where("owner", "==", user.uid), where("date", "==", formattedDate));
        const dailyGoalSnapshot = await getDocs(dailyGoalQuery);
        const dailyGoalCount = dailyGoalSnapshot.size;
        setDailyGoal(dailyGoalCount);

        const lifetimeGratitudesQuery = query(collection(db, "entry"), where("owner", "==", user.uid));
        const lifetimeGratitudesSnapshot = await getDocs(lifetimeGratitudesQuery);
        const lifetimeGratitudesCount = lifetimeGratitudesSnapshot.size;
        setLifetimeGratitudes(lifetimeGratitudesCount);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.'); 
      }
    };

    if (user) {
      fetchDailyGoal(); 
    }
  }, [user, formattedDate]);

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
      navigate('/pets');
      window.location.reload(); // Refresh the page
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
        <p className="font-size position-lifetime">Lifetime: {lifetimeGratitudes} </p> {/* Display lifetime gratitudes count */}
        <img className="img-size position-duck" src="adult_duck.PNG" alt="Duck" />
        <div className="button-container font-size-button">

          <Popup className="submitPopup" trigger={<button className="position-leftbutton" disabled={loading || !user || dailyGoal === 3}>{
            dailyGoal === 3 ? "DAILY GOAL COMPLETE" : "SUBMIT GRATITUDE"
          }</button>}{...{contentStyle}} modal nested>
            {closed => (
              <div>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="gratitudeInput">What are you grateful for?</label>
                  <input type="text" id="gratitudeInput" name="gratitude" value={gratitude} onChange={handleChange} required />
                  {error && <p className="error-message">{error}</p>} {/* Display error message */}
                  <button type="submit" disabled={loading || !user || dailyGoal === 3}>Submit</button> {/* Disable button during loading or if user is not logged in or daily goal is complete */}
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
