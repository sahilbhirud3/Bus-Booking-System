// import React from 'react';
// //import { Dropdown as MDBDropdown, Collapse as MDBCollapse } from 'mdb-react-ui-kit'; // Import the MDB components
// import { Link } from 'react-router-dom';
// import "./Navbar.css";
// //import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
// import { IoMdBus } from "react-icons/io";
// import { IoNotificationsSharp } from "react-icons/io5";
// import { CgProfile } from "react-icons/cg";




// function Navbar() {

//   return (
//     // <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
//     //   <div className="container-fluid">
//     //     <div className="navbar-brand">
//     //       <div className="left">
//     //         <div className="logo">
//     //           <DirectionsBusIcon fontSize='large'/>
//     //         </div>
//     //         <h1>SPARK BUS</h1>
//     //         <Link to="/" className="dashboard_button">Dashboard</Link>
//     //         <Link to="/aboutus" className="team_button">Team</Link>
//     //       </div>
//     //     </div>
//     //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     //       <div className="center">
//     //         {/* No content in the center */}
//     //       </div>
//     //     </div>
//     //     <div className="d-flex align-items-center">
//     //       <button className="notification_button">
//     //         <i className="fas fa-bell"></i>
//     //       </button>
//     //       <Link to="/login" className="login_button">Login</Link>
//     //       <button className="profile_button">
//     //         <i className="fas fa-user-circle"></i>
//     //       </button>
//     //     </div>
//     //   </div>
//     // </nav>



//     <nav className="custom-navbar">
//   <div className="custom-navbar-container">
//     <div className="custom-navbar-left">
//       <div className="logo">
//         <IoMdBus className='logo-bus'/>
//       </div>
//       <h3>SPARK BUS</h3>
//       <div className='SpaceContainer'/>
//       <Link to="/" className="dashboard-button">Dashboard</Link>
//       <Link to="/aboutus" className="team-button">Team</Link>
//     </div>
//     <div className="custom-navbar-center">

//       {/* No content in the center */}
    
//     </div>
//     <div className="custom-navbar-right">
//       <button className="notification-button">
//         <IoNotificationsSharp className='notification-icon'/>
//       </button>
//       <Link to="/login" className="login-button">Login</Link>
//       <button className="profile-button">
//         <CgProfile className='profile-icon'/>
//       </button>
//     </div>
//   </div>
// </nav>


    
//   );
// }

// export default Navbar;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdBus } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";

function Navbar() {
  // Assume you have a state to manage the JWT token
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwt'));

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
