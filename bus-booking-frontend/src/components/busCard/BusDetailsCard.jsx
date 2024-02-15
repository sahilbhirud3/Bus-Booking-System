import  { useEffect } from 'react';
import PropTypes from 'prop-types';
import './BusDetailsCard.css';

function BusDetailsCard({ from, to, duration, fare, handleBookNow }) {
  useEffect(() => {
    console.log(from, to, ".............");
  }, [from, to]); // Adding `to` to the dependency array to ensure re-rendering when `to` changes

  return (
    <div className="bus-details-container">
      <div className='part upper-row'><p><b>BusNo:</b></p>
      <div/><p><b>Fare:</b> {fare}</p></div>
      <div className='part middle-row'>
        <p><b>From:</b> {from}</p>
        <p><b>To:</b> {to}</p>
        <p><b>Duration:</b> {duration}</p>
      </div>
      <div className='part lower-row'>
        <p><b>DateTime</b></p>
        <p><b>DateTime</b></p>
        <p><button className="book-now-button" onClick={handleBookNow} >Book Now</button></p>
      </div>
    </div>
  );
}

BusDetailsCard.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  fare: PropTypes.string.isRequired,
  handleBookNow: PropTypes.func.isRequired
};

export default BusDetailsCard;