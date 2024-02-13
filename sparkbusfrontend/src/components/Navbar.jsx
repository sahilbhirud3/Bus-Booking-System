import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdBus } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";

function Navbar() {
  // Assume you have a state to manage the JWT token
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));

  // Function to handle logout
  const handleLogout = () => {
    if (window.confirm("Confirm Logout!")) {
        // Perform logout actions (e.g., clear authentication token, reset state, etc.)
        localStorage.removeItem('jwtToken'); // Remove token from localStorage
        setJwtToken(null); // Update token state
    }
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
          <Link to="/buslayout" className="team-button">Team</Link>
        </div>
        <div className="custom-navbar-center">
          {/* No content in the center */}
        </div>
        <div className="custom-navbar-right">
          <button className="notification-button">
            <IoNotificationsSharp className='notification-icon'/>
          </button>
          {/* Conditional rendering based on authentication status */}
          {jwtToken ? (
            <>
              <button className="login-button" onClick={handleLogout}>Logout</button>
              <button className="profile-button">
                <CgProfile className='profile-icon'/>
              </button>
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
