
import { useState, useEffect } from 'react';
import { MdOutlineChair } from "react-icons/md";
import { axiosInst } from '../../service/axiosInstance';
import { useParams } from 'react-router-dom';
import './BusLayout.css'; // Import CSS file

function BusLayout() {
  const [seats, setSeats] = useState([]);
  const [travelInfo, setTravelInfo] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false); // State to track booking success

  let totalSeats = 30;
  
  const { id } = useParams();
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
      // Check if startTime and endTime are defined
      if (!startTime || !endTime) {
        return 'Invalid input';
      }

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


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      
      const payload = {
        busId: id, // Assuming busId is a fixed value or it can come from state
        userId: localStorage.getItem('id'), // Assuming userId comes from localStorage or state
        fare: travelInfo.fare * passengerDetails.length, // Calculating fare based on the number of passengers and fare per passenger
        seatPassengerList: passengerDetails.map((passenger) => ({
          seatNo: passenger.seatNumber, // Assuming seat numbers start from 1
          passenger: {
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            gender: passenger.gender,
            age: passenger.age
          }
        }))
      };
      
      const response = await axiosInst.post('/bookings/book', payload);

      console.log('Passenger details submitted:', response.data);
      setBookingSuccess(true); // Set booking success state to true

    } catch (error) {
      console.error('Error submitting passenger details:', error);
    }
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
      const res = await axiosInst.get(`/seats/bus/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setTravelInfo(res.data);
      totalSeats=res.data.totalSeats;
      // console.log(res.data,".............");
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
              <button type='submit'>Book Ticket</button>
            </form>
            {bookingSuccess && (
        <div className="booking-success-message">
          <p>Booking Successful!</p>
        </div>
      )}
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

