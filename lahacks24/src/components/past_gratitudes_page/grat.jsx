import React, { useState, useEffect } from 'react';
import "./grat.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions for querying data
import { db } from '../../firebase.js'; // Assuming you have a Firebase configuration file

import { Outlet } from 'react-router-dom';

const Gratitudes = () => {
  const [gratitudes, setGratitudes] = useState([]);

  useEffect(() => {
    const fetchGratitudes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'entry')); // Replace 'gratitudes' with the name of your Firestore collection
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGratitudes(data);
      } catch (error) {
        console.error('Error fetching gratitudes:', error);
      }
    };

    fetchGratitudes();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <div>
        <div className='titleGrat'>
          <p className='titleText'>Past Gratitudes</p>
        </div>
        {gratitudes.map(gratitude => (
          <div className="columns-container">
            <div key={gratitude.id} className="column">
              <p>{gratitude.date}</p>
            </div>
            <div key={gratitude.id} className="column">
              <p>{gratitude.gratitude}</p>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default Gratitudes;