// src/components/Sablier.js
import React, { useState, useEffect } from 'react';

const Timeline = ({ startDate, endDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
  
    // Calcule la proportion de remplissage en vert en fonction des dates
    const calculateFillPercentage = () => {
      const totalDuration = endDate.getTime() - startDate.getTime();
      const passedDuration = currentDate.getTime() - startDate.getTime();
      const fillPercentage = (passedDuration / totalDuration) * 100;
      return Math.min(100, Math.max(0, fillPercentage)); // Limit the percentage between 0 and 100
    };
  
    // Met à jour l'heure actuelle toutes les secondes
    useEffect(() => {
      const timerId = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timerId);
      };
    }, []);
  
    const fillPercentage = calculateFillPercentage();
  
    return (
      <div style={{ width: '100px', height: '200px', background: 'gray', position: 'relative' }}>
        <div
          style={{
            width: '100%',
            height: `${fillPercentage}%`,
            background: 'green',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        ></div>
      </div>
    );
  };
  
  export default Timeline;