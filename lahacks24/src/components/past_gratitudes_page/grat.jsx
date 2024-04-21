import React, { useState, useEffect } from 'react';
import "./grat.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions for querying data
import { db, auth } from '../../firebase.js'; // Assuming you have a Firebase configuration file with auth imported

import { Outlet } from 'react-router-dom';

const Gratitudes = () => {
  const [gratitudes, setGratitudes] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const querySnapshot = await getDocs(collection(db, 'entry'));
          const data = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(gratitude => gratitude.owner === user.uid); // Filter gratitudes by owner matching auth user ID
          setGratitudes(data);
        } else {
          setGratitudes([]); // If no user is signed in, clear gratitudes
        }
        setLoading(false); // Set loading state to false
      } catch (error) {
        console.error('Error fetching gratitudes:', error);
        setError(error.message); // Set error state
        setLoading(false); // Set loading state to false
      }
    });

    return () => unsubscribe(); // Clean up subscription on component unmount
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  if (loading) {
    return <p>Loading...</p>; // Display loading indicator while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message if an error occurred
  }

  return (
    <div>
      <div>
        <div className='titleGrat'>
          <p className='titleText'>Past Gratitudes..</p>
        </div>
        <div className='pastGratitudes'> {/* Moved the div outside of the map function */}
          <ul className="gratList"> {/* Changed div to ul for semantic purposes */}
          {gratitudes.map(gratitude => (
            <li className="gratElements" key={gratitude.id}>
              {gratitude.date}{"\n"}{gratitude.gratitude} <hr className='line' /> 
            </li>
          ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Gratitudes;
