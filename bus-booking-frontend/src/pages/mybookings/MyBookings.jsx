import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { axiosInst } from '../../service/axiosInstance';
function MyBookings() {
  
  const[data,setData]=useState([])
  const { id } = useParams();
  
  const fetchBusById = async () => {
  try {
    const res = await axiosInst.get(`/bookings/getbookings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    console.log(res.data);
    setData(res.data)
  } catch (error) {
    console.log(error);
  }
};
function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
  useEffect(()=>{
  
    fetchBusById();
  },[])
  return (
    <>
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <div className="form_container">
            <h1>My Bookings</h1>
            <table className="map_table">
              <thead>
                <tr>
                  <th>Bus No</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Booking Date</th>
                  <th>Fare</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.map(location => (
                  <tr key={location.id}>
                    <td>{location.busNo}</td>
                    <td>{location.from}</td>
                    <td>{location.to}</td>
                    <td>{formatDate(location.bookingDateTime)}</td>
                    <td>{location.totalFare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right">
          <h1>Map</h1>
          {/* Your map component can go here */}
        </div>
      </div>
    </div>
    </>
  )
}

export default MyBookings