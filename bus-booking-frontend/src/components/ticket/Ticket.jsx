// import { useState } from 'react';
// import jsPDF from 'jspdf';
// import PropTypes from 'prop-types';


// function Ticket({ bookingId }) {
//   const [ticketData, setTicketData] = useState(null);
//   const [pdfContent, setPdfContent] = useState('');

//   // Function to fetch ticket data from the backend
//   const fetchTicketData = async () => {
//     try {
//       const response = await fetch(`/api/tickets/${bookingId}`);
//       const data = await response.json();
//       setTicketData(data);
//     } catch (error) {
//       console.error('Error fetching ticket data:', error);
//     }
//   };

//   // Function to generate PDF ticket
//   const generatePDF = () => {
//     if (!ticketData) return;

//     // Generate HTML content for the ticket
//     const ticketContent = `
//       <h1>Ticket Details</h1>
//       <p>Name: ${ticketData.passengerName}</p>
//       <p>Seat Number: ${ticketData.seatNumber}</p>
//       <p>Departure Time: ${ticketData.departureTime}</p>
//       <!-- Add more ticket details here -->
//     `;

//     // Create PDF document
//     const pdf = new jsPDF();
//     pdf.text(ticketContent, 10, 10); // Add HTML content to PDF

//     // Save PDF content
//     setPdfContent(pdf.output('datauristring'));
//   };

//   return (
//     <div>
//       <button onClick={fetchTicketData}>Fetch Ticket Data</button>
//       {ticketData && (
//         <>
//           <h2>Ticket Details</h2>
//           <p>Name: {ticketData.passengerName}</p>
//           <p>Seat Number: {ticketData.seatNumber}</p>
//           <p>Departure Time: {ticketData.departureTime}</p>
//           {/* Add more ticket details here */}
//           <button onClick={generatePDF}>Generate PDF Ticket</button>
//         </>
//       )}
//       {pdfContent && (
//         <div>
//           <h2>Your Ticket</h2>
//           <embed src={pdfContent} type="application/pdf" width="600" height="400" />
//           <a href={pdfContent} download="ticket.pdf">Download Ticket</a>
//         </div>
//       )}
//     </div>
//   );
// }


// Ticket.prototype = {
//     bookingId: PropTypes.string.isRequired
// };

// export default Ticket;

// import { useEffect, useState } from 'react';
// import jsPDF from 'jspdf';
// import PropTypes from 'prop-types';
// import { axiosInst } from '../../service/axiosInstance';
// import { useParams } from 'react-router-dom';
// // import "./Ticket.css";

// function Ticket({ bookingId }) {
//   const [ticketData, setTicketData] = useState(null);
//   const [pdfContent, setPdfContent] = useState('');

//   // Function to fetch ticket data from the backend
//   const fetchTicketData = async () => {
//     try {
//       const response = await axiosInst.get(`/bookings/getbooking/${bookingId}`);
//       const data = response.data;
//       console.log(data);
//       setTicketData(data);
//     } catch (error) {
//       console.error('Error fetching ticket data:', error);
//     }
//   };

//   useEffect(() => {
//     console.log(bookingId, ".............");
//     fetchTicketData();
//   }, [bookingId]);

//   // Function to generate PDF ticket
//   const generatePDF = () => {
//     if (!ticketData) return;

//     // Generate HTML content for the ticket
//     let passengerContent = '';
//     ticketData.seatPassengerList.forEach((passenger, index) => {
//       passengerContent += `
//         <p>Passenger ${index + 1}:</p>
//         <p>Name: ${passenger.passenger.firstName} ${passenger.passenger.lastName}</p>
//         <p>Age: ${passenger.passenger.age}</p>
//         <p>Gender: ${passenger.passenger.gender}</p>
//         <hr/>
//       `;
//     });

//     // Generate full ticket content
//     const ticketContent = `
//       <h1>Ticket Details</h1>
//       <p>Bus No: ${ticketData.busNo}</p>
//       <p>From: ${ticketData.from}</p>
//       <p>To: ${ticketData.to}</p>
//       <p>Booking Date: ${ticketData.bookingDateTime}</p>
//       <p>Total Fare: ${ticketData.totalFare}</p>
//       <h2>Passengers</h2>
//       ${passengerContent}
//     `;

//     // Create PDF document
//     const doc = new jsPDF();
//     doc.html(ticketContent, {
//       callback: function (pdf) {
//         pdf.save("ticket.pdf");
//         setPdfContent(pdf.output('datauristring'));
//       }
//     });
//   };

//   return (
//     <div className="ticket-container">
//       <button onClick={fetchTicketData}>Fetch Ticket Data</button>
//       {ticketData && (
//         <>
//           <div className="ticket-details">
//             <h2>Ticket Details</h2>
//             <p>Bus No: {ticketData.busNo}</p>
//             <p>From: {ticketData.from}</p>
//             <p>To: {ticketData.to}</p>
//             <p>Booking Date: {ticketData.bookingDateTime}</p>
//             <p>Total Fare: {ticketData.totalFare}</p>
//           </div>
//           <div className="passenger-details">
//             <h2>Passengers</h2>
//             <ul>
//               {ticketData.seatPassengerList.map((passenger, index) => (
//                 <li key={index}>
//                   <p>Name: {passenger.passenger.firstName} {passenger.passenger.lastName}</p>
//                   <p>Age: {passenger.passenger.age}</p>
//                   <p>Gender: {passenger.passenger.gender}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <button onClick={generatePDF}>Generate PDF Ticket</button>
//         </>
//       )}
//       {pdfContent && (
//         <div className="pdf-container">
//           <h2>Your Ticket</h2>
//           <embed className="pdf-embed" src={pdfContent} type="application/pdf" width="600" height="400" />
//           <a className="download-link" href={pdfContent} download="ticket.pdf">Download Ticket</a>
//         </div>
//       )}
//     </div>
//   );
// }

// Ticket.propTypes = {
//   bookingId: PropTypes.string.isRequired
// };

// export default Ticket;


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import './MyBookings.css';
import { axiosInst } from '../../service/axiosInstance';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Ticket() {
  // const history = useHistory();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchBookings = async () => {
    try {
      const res = await axiosInst.get(`/bookings/getbooking/${id}`, {
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

  const downloadTicket = () => {
    const filename = 'ticket.pdf';

    html2canvas(document.getElementById('ticket-container')).then(function (canvas) {
      let pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      pdf.save(filename);
    });
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <div className="form_container">
            <h1>My Bookings</h1>
            <div id="ticket-container">
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
                        <button onClick={downloadTicket}>Download Ticket</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
