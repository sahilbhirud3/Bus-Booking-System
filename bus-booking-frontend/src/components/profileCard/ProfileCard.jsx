import { Link } from 'react-router-dom';
import './ProfileCard.css'; // Import CSS file if needed
//import { propTypes } from 'react-bootstrap/esm/Image';

// eslint-disable-next-line react/prop-types
function ProfileCard({id, onClose}) {
  return (
    <div className={`profile-card `}> 
    <h3>Welcome!</h3>
    {/* {${isOpen ? 'open' : ''}} */}
      <div className="profile-content">
        <p>First Name: </p>
        <p>Last Name: Doe</p>
        <p>Age: 30</p>
        <Link  to={`/bookings/${id}`} className='bookings-button'>Bookings</Link>
        <Link to="/change-password" className='link-change-password' onClick={onClose}>Change Password</Link>
        {/*  */}
      </div>
    </div>
  );
}

// ProfileCard.propTypes= {
//   id: propTypes.string
// };

export default ProfileCard;
