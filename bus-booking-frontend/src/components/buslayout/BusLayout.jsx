// import { useState, useEffect } from 'react';
// import './BusLayout.css'; // Import your CSS file

// import { MdOutlineChair } from "react-icons/md";

// import { axiosInst } from "../../service/axiosInstance"

// function BusLayout() {
//   // Sample data for seats (replace with data from backend)
//   const totalSeats = 20;
//   const unavailableSeats = [3, 6, 9]; // Example unavailable seats

//   // State to store selected seats
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   // Function to handle seat selection
//   const handleSeatClick = (seatNumber) => {
//     if (!unavailableSeats.includes(seatNumber)) {
//       setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNumber]);
//     }
//   };

//   // Sample travel information (replace with data from backend)
//   const travelInfo = {
//     busNumber: "12345",
//     from: "FromStation",
//     to: "ToStation",
//     startTime: "08:00 AM",
//     endTime: "10:00 AM"
//   };

//   const calculateTotalTime = (startTime, endTime) => {
//     // Parse the start and end time strings into Date objects
//     const start = new Date(`01/01/2022 ${startTime}`);
//     const end = new Date(`01/01/2022 ${endTime}`);
  
//     // Calculate the difference in milliseconds
//     const differenceMs = end - start;
  
//     // Convert the difference to hours and minutes
//     const hours = Math.floor(differenceMs / (1000 * 60 * 60));
//     const minutes = Math.round((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
  
//     // Return the total time as a formatted string
//     return `${hours} hours ${minutes} minutes`;
//   };

//   // Generate seat elements based on totalSeats
//   const renderSeats = () => {
//     const seats = [];
//     for (let i = 1; i <= totalSeats; i++) {
//       seats.push(
//         <div
//           key={i}
//           className={`bus-seat ${unavailableSeats.includes(i) ? 'unavailable' : selectedSeats.includes(i) ? 'selected' : 'available'}`}
//           onClick={() => handleSeatClick(i)}
//         >
//           <MdOutlineChair className="seat-icon" />
//           {i}
//         </div>
//       );
//     }
//     return seats;
//   };

//   // const fetchBusDetails = () => {
//   //   //"bus/getbuses"
//   //   ///seats/bus/1
//   //   axiosInst
    
//   //     .get("/bus/getallbuses", {
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//   //       },
//   //     })
//   //     .then((response) => {
//   //       console.log(response.data);
//   //       // setStationList(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching stations:", error);
//   //     });
//   // };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Passenger details submitted:', passengerDetails);
//     // Here you can handle the submission of passenger details
//   };

//   const fetchBusById = async () => {
//     try {
//       const res = await axiosInst.get(`/seats/bus/${5}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//         },
//       });
//       setTravelInfo(res.data);
//       // console.log(res.data);
//       setSeats(res.data.bookedSeats);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(()=>{
//     fetchBusDetails();
//   },[])

//   return (
//     <>
 
//     <div className="bus-seat-selection-page">
//       <div className="left-section">
//         <div className="upper-left">
//           <h2>Travel Information</h2>
//           <p>Bus Number: {travelInfo.busNumber}</p>
//           <img src="bus-image-url" alt="Bus" />
//           <p>From: {travelInfo.from}</p>
//           <p>To: {travelInfo.to}</p>
//           <p>Departure Time: {travelInfo.startTime}</p>
//           <p>Completion Time: {travelInfo.endTime}</p>
//           <p>Total Time: {calculateTotalTime(travelInfo.startTime, travelInfo.endTime)}</p>
//         </div>
//         <div className="lower-left">
//         <div className="lower-left">
//             <h2>Passenger Details</h2>
//             <form onSubmit={handleSubmit}>
//               {passengerDetails.map(passenger => (
//                 <div key={passenger.seatNumber}>
//                   <label htmlFor={`firstName_${passenger.seatNumber}`}>Seat {passenger.seatNumber}</label>
//                   <div className="passenger-form">
//                     <input
//                       id={`firstName_${passenger.seatNumber}`}
//                       type="text"
//                       value={passenger.firstName || ''}
//                       onChange={(event) => handleInputChange(event, passenger.seatNumber, 'firstName')}
//                       placeholder="First Name"
//                     />
//                     <input
//                       type="text"
//                       value={passenger.lastName || ''}
//                       onChange={(event) => handleInputChange(event, passenger.seatNumber, 'lastName')}
//                       placeholder="Last Name"
//                     />
//                     <input
//                       type="number"
//                       value={passenger.age || ''}
//                       onChange={(event) => handleInputChange(event, passenger.seatNumber, 'age')}
//                       placeholder="Age"
//                     />
//                     <select
//                       value={passenger.gender || ''}
//                       onChange={(event) => handleInputChange(event, passenger.seatNumber, 'gender')}
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               ))}
//               <button type="submit">Book Ticket</button>
//             </form>
//           </div>
//           <h2>Lower Half Card</h2>
//         </div>
//       </div>
//       <div className="right-section">
//       <h2>Select your Seats</h2>
//         <div className="main-card">
//           {/* Main section with bus seat layout */}
          
//           <div className="seat-layout">
//             <div>
//               {renderSeats().slice(0, totalSeats / 2)}
//             </div>
//             <div>
//               {renderSeats().slice(totalSeats / 2)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
  
//     </>
//   );
// }

// export default BusLayout;



import { useState, useEffect } from 'react';
import './BusLayout.css';
import { MdOutlineChair } from "react-icons/md";
// Import Axios directly instead of using axiosInst
import { axiosInst } from '../../service/axiosInstance';

function BusLayout() {
  const [seats, setSeats] = useState([]);
  const [travelInfo, setTravelInfo] = useState({});
  const totalSeats = 30;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(seat => seat !== seatNumber));
      setPassengerDetails(prevDetails => prevDetails.filter(passenger => passenger.seatNumber !== seatNumber));
    } else {
      if (!seats.includes(seatNumber)) {
        setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seatNumber]);
        setPassengerDetails(prevDetails => [
          ...prevDetails,
          { seatNumber, firstName: '', lastName: '', age: '', gender: '' }
        ]);
      }
    }
  };

  const handleInputChange = (event, seatNumber, fieldName) => {
    const { value } = event.target;
    setPassengerDetails(prevDetails =>
      prevDetails.map(passenger =>
        passenger.seatNumber === seatNumber ? { ...passenger, [fieldName]: value } : passenger
      )
    );
  };

  const convertToValidTimeFormat = (dateTimeString) => {
    return dateTimeString.split('T')[1].split('.')[0];
  };

  const calculateTotalTime = (startTime, endTime) => {
    try {
      const start = new Date(`01/01/2022 ${convertToValidTimeFormat(startTime)}`);
      const end = new Date(`01/01/2022 ${convertToValidTimeFormat(endTime)}`);

      let differenceMs = end - start;
      if (differenceMs < 0) {
        differenceMs += 24 * 60 * 60 * 1000;
      }

      const hours = Math.floor(differenceMs / (1000 * 60 * 60));
      const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours} hours ${minutes} minutes`;
    } catch (error) {
      console.error('Error calculating total time:', error);
      return 'Invalid input';
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Passenger details submitted:', passengerDetails);
    // Here you can handle the submission of passenger details
  };

  const renderSeats = () => {
    const seatElements = [];
    for (let i = 1; i <= totalSeats; i++) {
      const isSeatBooked = seats.includes(i);
      const isSeatSelected = selectedSeats.includes(i);
      seatElements.push(
        <div key={i} className={`bus-seat ${isSeatBooked ? 'unavailable' : isSeatSelected ? 'selected' : 'available'}`} onClick={() => handleSeatClick(i)}>
          <MdOutlineChair className="seat-icon" />
          {i}
        </div>
      );
    }
    return seatElements;
  };
  
  const fetchBusById = async () => {
    try {
      const res = await axiosInst.get(`/seats/bus/${5}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setTravelInfo(res.data);
      // console.log(res.data);
      setSeats(res.data.bookedSeats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBusById();
  }, []);

  return (
    <>
      <div className="bus-seat-selection-page">
        <div className="left-section">
          <div className="upper-left">
            <h2>Travel Information</h2>
            <p>Bus Number: {travelInfo.busNo}</p>
            <img src="bus-image-url" alt="Bus" />
            <p>From: {travelInfo.from}</p>
            <p>To: {travelInfo.to}</p>
            <p>Departure Time: {travelInfo.startTime}</p>
            <p>Completion Time: {travelInfo.endTime}</p>
            <p>Total Time: {calculateTotalTime(travelInfo.startTime, travelInfo.endTime)}</p>
          </div>
          <div className="lower-left">
            <h2>Passenger Details</h2>
            <form onSubmit={handleSubmit}>
              {passengerDetails.map(passenger => (
                <div key={passenger.seatNumber}>
                  <label htmlFor={`firstName_${passenger.seatNumber}`}>Seat {passenger.seatNumber}</label>
                  <div className="passenger-form">
                    <input
                      id={`firstName_${passenger.seatNumber}`}
                      type="text"
                      value={passenger.firstName || ''}
                      onChange={(event) => handleInputChange(event, passenger.seatNumber, 'firstName')}
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      value={passenger.lastName || ''}
                      onChange={(event) => handleInputChange(event, passenger.seatNumber, 'lastName')}
                      placeholder="Last Name"
                    />
                    <input
                      type="number"
                      value={passenger.age || ''}
                      onChange={(event) => handleInputChange(event, passenger.seatNumber, 'age')}
                      placeholder="Age"
                    />
                    <select
                      value={passenger.gender || ''}
                      onChange={(event) => handleInputChange(event, passenger.seatNumber, 'gender')}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              ))}
              <button type="submit">Book Ticket</button>
            </form>
          </div>
        </div>
        <div className="right-section">
          <div className="main-card">
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
