import React from 'react'
import './BusDetailsCard.css'; // Import your CSS file

function BusDetailsCard({ busNo, fromStation, startTime, toStation, endTime, fare, calcFare }) {
  const handleBookNow = () => {
    // Handle book now button click, e.g., route to another page
  };



  const CalcFare = () => {

  };

  return (
    <div className="bus-details-container">
      <div className="left-half">
        <div className="left-top">
          <p><b>Bus No:</b> {busNo}</p>
        </div>
        <div className="left-mid">
          <p><b>From:</b> {fromStation}</p>
        </div>
        <div className="left-bottom">
          <p><b>Departure:</b> {startTime}</p>
        </div>
      </div>
      <div className="center-half">
        <div className="center-mid">
          <p><b>To:</b> {toStation}</p>
        </div>
        <div className="center-bottom">
          <p><b>Reaching:</b> {endTime}</p>
        </div>
      </div>
      <div className="right-half">
        <div className="right-top">
          <p><b>Fare:</b> {}</p> //calcFare()
        </div>
        <div className="right-bottom">
          <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default BusDetailsCard
