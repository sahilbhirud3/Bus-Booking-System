import  { useEffect } from 'react';
import PropTypes from 'prop-types';
import './BusDetailsCard.css';
import logo from "../../assets/images/buslogo.jpg"

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month} ${hours}:${minutes}`;
}

function BusDetailsCard({ busNo, from, to, startTime, endTime, duration, fare, handleBookNow }) {
  useEffect(() => {
    console.log(from, to, ".............");
  }, [from, to]); // Adding `to` to the dependency array to ensure re-rendering when `to` changes

  return (
    <>
    <div className="bus-details-container">
      <div className='left'>

      <div className='part upper-row'>
      <p><b>From:</b> {from}</p>
        <p><b>To:</b> {to}</p>
      
      <div><p className='fare'><b>Fare:</b> {fare}</p></div></div>
      <div className='part middle-row'>
      <p><b>At:</b> {formatDateTime(startTime)}</p>
        <p><b>At:</b> {formatDateTime(endTime)}</p>
        <p></p>
      </div>
      <div className='part lower-row'>
      <div><p><b>BusNo:</b> {busNo}</p></div>
        <p><b>Duration:</b> {duration}</p>
        <p><button className="book-now-button" onClick={handleBookNow} >Book Now</button></p>
      </div>
      </div>
      <div className='right'>
        <img src={logo} alt="Logo here" />
      </div>
    </div>
    </>
  );
}

BusDetailsCard.propTypes = {
  busNo: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  fare: PropTypes.string.isRequired,
  handleBookNow: PropTypes.func.isRequired
};

export default BusDetailsCard;