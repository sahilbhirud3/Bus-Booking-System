import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdBus } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));

  // Function to handle logout
  const handleLogout = () => {
    if (window.confirm("Confirm Logout!")) {
        localStorage.removeItem('jwtToken'); // Remove token from localStorage
        setJwtToken(null); // Update token state
    }
};

const notify = () => {
  toast.info("Lets not keep it just a Toast", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
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
          <Link to="/aboutus" className="team-button">Team</Link>
          {jwtToken && (
            <Link to="/bookings" className='bookings-button'>Bookings</Link>
          )}
        </div>
        
        <div className="custom-navbar-right">
        <div className="notification-wrapper">
            <button className="notification-button" onClick={notify}>
              <IoNotificationsSharp className='notification-icon'/>
            </button>
            <ToastContainer />
          </div>
          
          
          
          {jwtToken ? (
            <>
             <Link className="login-button" onClick={handleLogout}> Logout</Link>
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
