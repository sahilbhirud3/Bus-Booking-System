import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdBus } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";

function Navbar() {
  // Sample user data (replace with actual data fetched from backend)
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    age: 30
  });

  // Assume you have a state to manage the JWT token
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwt'));
  const [showProfileCard, setShowProfileCard] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions (e.g., clear authentication token, reset state, etc.)
    localStorage.removeItem('jwt'); // Remove token from localStorage
    setJwtToken(null); // Update token state
  };

  return (
    <nav className="custom-navbar">
      <div className="custom-navbar-container">
        <div className="custom-navbar-left">
          <div className="logo">
            <IoMdBus className='logo-bus'/>
          </div>
          <h3>SPARK BUS</h3>
          <div className='SpaceContainer'/>
          <Link to="/" className="dashboard-button">Dashboard</Link>
          <Link to="/buslcard" className="team-button">Team</Link>
        </div>
        <div className="custom-navbar-center">
          {/* No content in the center */}
        </div>
        <div className="custom-navbar-right">
          <button className="notification-button">
            <IoNotificationsSharp className='notification-icon'/>
          </button>
          {/* Conditional rendering based on authentication status */}
          {jwtToken ?  (
            <>
            <button className="login-button" onClick={handleLogout}>Logout</button>
              <button className="profile-button" onClick={() => setShowProfileCard(!showProfileCard)}>
                <CgProfile className='profile-icon'/>
              </button>
              {showProfileCard && (
                <div className="profile-card">
                  <h4>{userData.firstName} {userData.lastName}</h4>
                  <p>Age: {userData.age}</p>
                  <Link to="/history" className="history-button">History</Link>
                </div>
              )}
              
            </>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
