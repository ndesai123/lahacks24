import React, { useState, useEffect } from 'react';
import "./pet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { auth, db } from '../../firebase.js';
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore"; 

import { Outlet } from 'react-router-dom';

const Pets = () => {
  const navigate = useNavigate();
  const [gratitude, setGratitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [dailyGoal, setDailyGoal] = useState(0); 
  const [lifetimeGratitudes, setLifetimeGratitudes] = useState(0); 
  const [user, setUser] = useState(null); 
  const [points, setPoints] = useState(0);

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

        const userRefQuery = query(collection(db, 'user'), where('owner', '==', user.uid));
        const userDocs = await getDocs(userRefQuery);

        if (!userDocs.empty && userDocs.docs.length > 0) {
          const userDoc = userDocs.docs[0];
          setPoints(userDoc.data().points);
        } else {
          setPoints(0);
        }
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
      const entryRef = await addDoc(collection(db, "entry"), {
        date: formattedDate,
        gratitude,
        owner: user.uid
      });
      console.log('Event data stored successfully with ID:', entryRef.id);
  
      const userRefQuery = query(collection(db, 'user'), where('owner', '==', user.uid));
      const userDocs = await getDocs(userRefQuery);

      if (!userDocs.empty && userDocs.docs.length > 0) {
        const userDoc = userDocs.docs[0];

        const newPoints = userDoc.data().points + 50;

        await updateDoc(userDoc.ref, { points: Math.max(newPoints, 0) }); 
      } else {
        await addDoc(collection(db, 'user'), {
          owner: user.uid,
          points: 50 
        });
      }

  
      setLoading(false);
      navigate('/pets');
      window.location.reload();
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
        <p className="font-size position-points">Points: {points}/1000</p> {/* Display points out of 1000 */}
        <div className="health-bar">
          <div className="health-bar-fill" style={{ width: `${(points / 1000) * 100}%` }}></div>
        </div>
        <img className="img-size position-duck" src="adult_duck.PNG" alt="Duck" />
        <div className="button-container font-size-button">

        <Popup className="submitPopup" trigger={<button className="position-leftbutton" disabled={loading || !user || dailyGoal === 3}>{
            dailyGoal === 3 ? "DAILY GOAL COMPLETE" : "SUBMIT GRATITUDE"
          }</button>}{...{contentStyle}} modal nested>
            {closed => (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <label htmlFor="gratitudeInput" style={{ fontFamily: "Inria Serif", fontSize: "18px" }}>What are you grateful for today?</label> {/* Apply font family style and adjust font size */}
                  <br /> {/* Add line break */}
                  <br />
                  {error && <p className="error-message">{error}</p>} {/* Display error message */}
                  <textarea 
                    id="gratitudeInput" 
                    name="gratitude" 
                    value={gratitude} 
                    onChange={handleChange} 
                    required 
                    style={{ width: '400px', height: '100px', resize: 'vertical' }} // Adjust width and height to make the text box larger and enable vertical resizing
                  />
                  <br /> 
                  <br /> 
                  <button type="submit" style={{ fontFamily: "Inria Serif", backgroundColor: "black", color: "white", padding: "10px 20px" }} disabled={loading || !user || dailyGoal === 3}>SUBMIT</button> {/* Apply font family style, set background color to black, and text color to white. Adjust padding to make the button bigger. Disable button during loading or if user is not logged in or daily goal is complete */}
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
