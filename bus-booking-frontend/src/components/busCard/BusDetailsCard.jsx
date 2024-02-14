// import './BusDetailsCard.css'; // Import your CSS file


// import PropTypes from 'prop-types'; // Import PropTypes
// import { useEffect } from 'react';
// // import './BusDetailsCard.css'; // Import your CSS file

// function BusDetailsCard({ from, to, duration, fare,handleBookNow }) {
//     useEffect(()=>{
//         console.log(from,to,".............");
//     },[])
//     return (
//         <div className="bus-details-container">
//             <div>
//                 <p><b>From:</b> {from}</p>
//                 <p><b>To:</b> {to}</p>
//                 <p><b>Duration:</b> {duration}</p>
//             </div>
//             <div>
//                 <p><b>Fare:</b> {fare}</p>
//                 <button className="book-now-button" onClick={handleBookNow} >Book Now</button>
//             </div>
//         </div>
//     );
// }

// // Define propTypes for the BusDetailsCard component
// BusDetailsCard.propTypes = {
//     from: PropTypes.string,
//     to: PropTypes.string,
//     duration: PropTypes.string,
//     fare: PropTypes.string
// };

// export default BusDetailsCard;

import  { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import your CSS file
import './BusDetailsCard.css';

function BusDetailsCard({ from, to, duration, fare, handleBookNow }) {
  useEffect(() => {
    console.log(from, to, ".............");
  }, [from, to]); // Adding `to` to the dependency array to ensure re-rendering when `to` changes

  return (
    <div className="bus-details-container">
      <div>
        <p><b>From:</b> {from}</p>
        <p><b>To:</b> {to}</p>
        <p><b>Duration:</b> {duration}</p>
      </div>
      <div>
        <p><b>Fare:</b> {fare}</p>
        <button className="book-now-button" onClick={handleBookNow} >Book Now</button>
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