import React from 'react';
import '../../../styles/home.css';

function WideCityCard() {
  return (
    <>
      <div className="city-cards">
        <div className="city-container">
          <img className="city-img" /* src={} */ alt="NY City" />
          <div className="city-metrics">
            <h1>City Name</h1>
            <h3>Overall Ranking</h3>
            <p>Population</p>
            <p>Cost Of Living</p>
            <p>Median Household Income</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WideCityCard;
