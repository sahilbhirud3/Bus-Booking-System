import React from 'react';
//import { Dropdown as MDBDropdown, Collapse as MDBCollapse } from 'mdb-react-ui-kit'; // Import the MDB components
import { Link } from 'react-router-dom';
import "./Navbar.css";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';



function Navbar() {

  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
    //   <div className="container-fluid">
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-mdb-toggle="collapse"
    //       data-mdb-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <i className="fas fa-bars"></i>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <span className="navbar-brand mt-10 mt-lg-0" href="/">
    //         {/* <img
    //           src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
    //           height="15"
    //           alt="MDB Logo"
    //           loading="lazy"
    //         /> */}
    //         <DirectionsBusIcon fontSize='large'/>
    //         <p>SPARK BUS</p>
    //       </span>
    //       <span></span>
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <a className="nav-link" href="/">
    //             Dashboard
    //           </a>
    //         </li>
    //         <li className="nav-item">
    //         <li><Link to="/aboutus" className='nav-link'>Team</Link>
    //           </li>
    //         </li>
    //         <li className="nav-item">
    //             {/* <div className='nav-link' onClick={()=>navigate("/login")}>
    //               Projects
    //             </div> */}
    //             {/* <li><Link to="/login" className='nav-link'>Login</Link></li> */}
    //             <li><Link to="/login" className='nav-link'>Login</Link></li>

    //         </li>
    //       </ul>
    //     </div>

    //     <div className="d-flex align-items-center">
    //       <a className="text-reset me-3" href="/">
    //         <ShoppingCartIcon fontSize='large'/>
    //       </a>

    //       <div className="dropdown">
    //         <a
    //           className="text-reset me-3 dropdown-toggle hidden-arrow"
    //           href="#"
    //           id="navbarDropdownMenuLink"
    //           role="button"
    //           aria-expanded="false"
    //         >
    //           <i className="fas fa-bell"></i>
    //           <span className="badge rounded-pill badge-notification bg-danger">1</span>
    //         </a>
    //         <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Some news
    //             </a>
    //           </li>
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Another news
    //             </a>
    //           </li>
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Something else here
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       <div className="dropdown">
    //         <a
    //           className="dropdown-toggle d-flex align-items-center hidden-arrow"
    //           href="#"
    //           id="navbarDropdownMenuAvatar"
    //           role="button"
    //           aria-expanded="false"
    //         >
    //           <img
    //             src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
    //             className="rounded-circle"
    //             height="25"
    //             alt="Black and White Portrait of a Man"
    //             loading="lazy"
    //           />
    //         </a>
    //         <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
    //           <li>
    //             <a className="dropdown-item" href="/login">
    //               My profile
    //             </a>
    //           </li>
    //           <li>
    //             <a className="dropdown-item" href="#">
    //               Settings
    //             </a>
    //           </li>
    //           <li>
    //             <a className="dropdown-item" href="/">
    //               Logout
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </nav>


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
