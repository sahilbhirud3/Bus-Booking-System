import  { useState } from 'react';
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
          <h4>SPARK BUS</h4>
          <Link to="/" className="dashboard-button">Dashboard</Link>
          <Link to="/buslayout" className="team-button">Team</Link>
        </div>
        
        <div className="custom-navbar-right">
          <button className="notification-button">
            <IoNotificationsSharp className='notification-icon'/>
          </button>
          {/* Conditional rendering based on authentication status */}
          
          {jwtToken ? (
            <>
<<<<<<< HEAD
              <button className="logout-button" onClick={handleLogout}>Logout</button>
=======
             <Link className="login-button" onClick={handleLogout}> Logout</Link>
>>>>>>> 84f9686b1bf31abcc156dfaee948c91c957b6af7
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
