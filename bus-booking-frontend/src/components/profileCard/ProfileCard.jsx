import { Link } from 'react-router-dom';
import './ProfileCard.css'; // Import CSS file if needed

function ProfileCard({ isOpen, onClose }) {
  return (
    <div className={`profile-card ${isOpen ? 'open' : ''}`}>
      <div className="profile-content">
        <p>First Name: John</p>
        <p>Last Name: Doe</p>
        <p>Age: 30</p>
        <Link to="/profile" className="profile-link">View Profile</Link>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProfileCard;
