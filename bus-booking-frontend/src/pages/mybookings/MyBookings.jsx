// import { useEffect, useState,useNavigate } from 'react'
// import { Link, useParams } from 'react-router-dom';
// import "./MyBookings.css";
// import { axiosInst } from '../../service/axiosInstance';
// // import Ticket from '../../components/ticket/Ticket';



// function formatDateTime(dateTimeString) {
  
//   const date = new Date(dateTimeString);
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   return `${day}/${month} ${hours}:${minutes}`;
// }

// function MyBookings() {
  
//   const navigate=useNavigate();
//   const[data,setData]=useState([])
//   const { id } = useParams();
  
//   const fetchBusById = async () => {
//     try {
//       const res = await axiosInst.get(`/bookings/getbookings/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//         },
//       });
//       console.log(res.data);
//       setData(res.data)
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   function formatDate(dateString) {
//     const dateObj = new Date(dateString);
//     const year = dateObj.getFullYear();
//     const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month starts from 0
//     const day = String(dateObj.getDate()).padStart(2, '0');
  
//     return `${year}-${month}-${day}`;
//   }
  
//   const getBookinDetails=(bookingId)=>{
//     console.log(bookingId);
//     navigate(`/ticket/print/${bookingId}`)///ticket/print/:bookingId
//   }
//   useEffect(() => {
//     fetchBusById();
//   }, [])
  
//   return (
//     <>
//       <div className="login_container">
//         <div className="login_form_container">
//           <div className="left">
//             <div className="form_container">
//               <h1>My Bookings</h1>
//               <table className="map_table">
//                 <thead>
//                   <tr>
//                     <th>Bus No</th>
//                     <th>From</th>
//                     <th>To</th>
//                     <th>Booking Date</th>
//                     <th>Fare</th>
//                     <th>Actions</th> {/* Add the new column for actions */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                    {data.map(location => (
//                     <tr key={location.id}>
//                       <td>{location.busNo}</td>
//                       <td>{location.from} at {formatDateTime(location.startTime)}</td>
//                       <td>{location.to} at {formatDateTime(location.endTime)}</td>
//                       <td>{formatDate(location.bookingDateTime)}</td>
//                       <td>{location.totalFare}</td>
//                       <td>
//                         <button onClick={()=>getBookinDetails(location.id)} >Ticket</button>
//                       </td>
//                     </tr>
//                   ))}
//                   <tr></tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default MyBookings

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MyBookings.css';
import { axiosInst } from '../../service/axiosInstance';

function MyBookings() {
  // const history = useHistory();
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchBookings = async () => {
    try {
      const res = await axiosInst.get(`/bookings/getbookings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const viewTicket = (bookingId) => {
    // history.push(`/ticket/print/${bookingId}`);
    navigate(`/ticket/print/${bookingId}`);
  };

  return (
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(location => (
                  <tr key={location.id}>
                    <td>{location.busNo}</td>
                    <td>{location.from} at {formatDateTime(location.startTime)}</td>
                    <td>{location.to} at {formatDateTime(location.endTime)}</td>
                    <td>{formatDate(location.bookingDateTime)}</td>
                    <td>{location.totalFare}</td>
                    <td>
                      <button onClick={() => viewTicket(location.id)}>Ticket</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;

