import React from 'react';
//import { Dropdown as MDBDropdown, Collapse as MDBCollapse } from 'mdb-react-ui-kit'; // Import the MDB components
import { Link } from 'react-router-dom';
import "./Navbar.css";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';



function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <div className="navbar-brand">
          <div className="left">
            <div className="logo">
              <DirectionsBusIcon fontSize='large'/>
            </div>
            <h1>SPARK BUS</h1>
            <Link to="/" className="dashboard_button">Dashboard</Link>
            <Link to="/aboutus" className="team_button">Team</Link>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="center">
            {/* No content in the center */}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <button className="notification_button">
            <i className="fas fa-bell"></i>
          </button>
          <Link to="/login" className="login_button">Login</Link>
          <button className="profile_button">
            <i className="fas fa-user-circle"></i>
          </button>
        </div>
      </div>
    </nav>

    
  );
}

export default Navbar;
