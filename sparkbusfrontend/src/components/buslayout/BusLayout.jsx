// import React, { useState } from 'react';
// import './BusLayout.css';
// import { FaChair } from 'react-icons/fa'; // Import the seat icon from Font Awesome

// function BusLayout() {
//   // Sample seat data - You can replace this with your own logic to generate seat data
//   const rows = 5; // Number of rows
//   const seatsPerRow = 4; // Number of seats per row

//   // Function to generate sample seat data
//   const generateSeats = () => {
//     const seats = [];
//     for (let i = 0; i < rows; i++) {
//       const row = [];
//       for (let j = 0; j < seatsPerRow; j++) {
//         const seatNumber = i * seatsPerRow + j + 1; // Seat numbers start from 1 and increment sequentially
//         row.push({ seatNumber, available: true }); // Initially, all seats are available
//       }
//       seats.push(row);
//     }
//     return seats;
//   };

//   // State to store seat data
//   const [seatData, setSeatData] = useState(generateSeats());

//   // Function to handle seat click
//   const handleSeatClick = (rowIndex, seatIndex) => {
//     // Create a copy of seatData
//     const newSeatData = [...seatData];
//     // Toggle the availability of the clicked seat
//     newSeatData[rowIndex][seatIndex].available = !newSeatData[rowIndex][seatIndex].available;
//     // Update the state with the new seat data
//     setSeatData(newSeatData);
//   };

//   return (
//     <div className="bus-layout">
//       {seatData.map((row, rowIndex) => (
//         <div key={rowIndex} className="bus-row">
//           {row.map(({ seatNumber, available }, seatIndex) => (
//             <div
//               key={seatIndex}
//               className={`bus-seat ${available ? 'green' : 'gray'}`}
//               onClick={() => available && handleSeatClick(rowIndex, seatIndex)} // Only handle click if seat is available
//             >
//               <FaChair /> {/* Seat icon from Font Awesome */}
//               {seatNumber}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default BusLayout;



import React, { useState, useEffect } from 'react';
import './BusLayout.css'; // Import your CSS file
import { FaChair } from 'react-icons/fa'; // Import the seat icon from Font Awesome

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
          <FaChair className="seat-icon" />
          {i}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="bus-seat-selection-page">
      <div className="left-section">
        <div className="upper-left">
          {/* Travel information goes here */}
          <h2>Travel Information</h2>
        </div>
        <div className="lower-left">
          {/* Card occupying the lower half */}
          <h2>Lower Half Card</h2>
        </div>
      </div>
      <div className="right-section">
        <div className="main-card">
          {/* Main section with bus seat layout */}
          <h2>Bus Seat Layout</h2>
          <div className="seat-layout">
            {renderSeats()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusLayout;
