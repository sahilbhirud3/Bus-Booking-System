import React from 'react'
import SearchForm from './SearchForm'
import Login from './login/Login'
import BusDetailsCard from './busdetailscard/BusDetailsCard'

function Outlet() {
  return (
    <>
    <div className="outlet_container">
      <div className="background_image">
        <SearchForm />
      </div>
      <div className="card_container">
        <span className="card">
          {/* Image and description goes here */}
          <img src="card_image.jpg" alt="Card" />
          <p>Random Description</p>
        </span>
      </div>
      <div className="reviews_container">
        {/* <Reviews /> */}
      </div>
    </div>




    <p>
    India's No. 1 Online Bus Ticket Booking Site
    </p>
    {/* <Login></Login> */}

    <BusDetailsCard/>
    
    </>
  )
}

export default Outlet