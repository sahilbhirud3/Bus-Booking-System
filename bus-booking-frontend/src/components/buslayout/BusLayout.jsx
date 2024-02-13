import { useState, useEffect } from 'react';
import './BusLayout.css'; // Import your CSS file

import { MdOutlineChair } from "react-icons/md";

import { axiosInst } from "../../service/axiosInstance"

function BusLayout() {
  // Sample data for seats (replace with data from backend)
  const totalSeats = 20;
  const unavailableSeats = [3, 6, 9]; // Example unavailable seats

  // State to store selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Function to handle seat selection
  const handleSeatClick = (seatNumber) => {
    if (!unavailableSeats.includes(seatNumber)) {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNumber]);
    }
  };

  // Sample travel information (replace with data from backend)
  const travelInfo = {
    busNumber: "12345",
    from: "FromStation",
    to: "ToStation",
    startTime: "08:00 AM",
    endTime: "10:00 AM"
  };

  const calculateTotalTime = (startTime, endTime) => {
    // Parse the start and end time strings into Date objects
    const start = new Date(`01/01/2022 ${startTime}`);
    const end = new Date(`01/01/2022 ${endTime}`);
  
    // Calculate the difference in milliseconds
    const differenceMs = end - start;
  
    // Convert the difference to hours and minutes
    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.round((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
  
    // Return the total time as a formatted string
    return `${hours} hours ${minutes} minutes`;
  };

  // Generate seat elements based on totalSeats
  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <div
          key={i}
          className={`bus-seat ${unavailableSeats.includes(i) ? 'unavailable' : selectedSeats.includes(i) ? 'selected' : 'available'}`}
          onClick={() => handleSeatClick(i)}
        >
          <MdOutlineChair className="seat-icon" />
          {i}
        </div>
      );
    }
    return seats;
  };

  const fetchBusDetails = () => {
    //"bus/getbuses"
    ///seats/bus/1
    axiosInst
    
      .get("/bus/getallbuses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // setStationList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
      });
  };

  useEffect(()=>{
    fetchBusDetails();
  },[])

  return (
    <>
 
    <div className="bus-seat-selection-page">
      <div className="left-section">
        <div className="upper-left">
          <h2>Travel Information</h2>
          <p>Bus Number: {travelInfo.busNumber}</p>
          <img src="bus-image-url" alt="Bus" />
          <p>From: {travelInfo.from}</p>
          <p>To: {travelInfo.to}</p>
          <p>Departure Time: {travelInfo.startTime}</p>
          <p>Completion Time: {travelInfo.endTime}</p>
          <p>Total Time: {calculateTotalTime(travelInfo.startTime, travelInfo.endTime)}</p>
        </div>
        <div className="lower-left">
          {/* Card occupying the lower half */}
          <h2>Lower Half Card</h2>
        </div>
      </div>
      <div className="right-section">
        <div className="main-card">
          {/* Main section with bus seat layout */}
          <h2>Select your Seats</h2>
          <div className="seat-layout">
            <div>
              {renderSeats().slice(0, totalSeats / 2)}
            </div>
            <div>
              {renderSeats().slice(totalSeats / 2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  
    </>
  );
}

export default BusLayout;
