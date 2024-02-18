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


import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { axiosInst } from '../../service/axiosInstance';
import { useParams } from 'react-router-dom';
import "./Ticket.css";

function Ticket() {
    const [ticketData, setTicketData] = useState(null);
    const [pdfContent, setPdfContent] = useState('');
    const { bookingId } = useParams();
  
    // Function to fetch ticket data from the backend
    const fetchTicketData = async () => {
      try {      const response = await axiosInst.get(`/bookings/getbooking/${bookingId}`);
      const data = await response.data;
      console.log(data);
      setTicketData(data);
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    }
  };

  useEffect(() => {
    console.log(bookingId, ".............");
    fetchTicketData();
  }, [bookingId]);

  // Function to generate PDF ticket
  const generatePDF = () => {
    if (!ticketData) return;

    // Generate HTML content for the ticket
    let passengerContent = '';
    ticketData.seatPassengerList.forEach((passenger, index) => {
      passengerContent += `
        <p>Passenger ${index + 1}:</p>
        <p>Name: ${passenger.passenger.firstName} ${passenger.passenger.lastName}</p>
        <p>Age: ${passenger.passenger.age}</p>
        <p>Gender: ${passenger.passenger.gender}</p>
        <hr/>
      `;
    });

    // Generate full ticket content
    const ticketContent = `
      <h1>Ticket Details</h1>
      <p>Bus No: ${ticketData.busNo}</p>
      <p>From: ${ticketData.from}</p>
      <p>To: ${ticketData.to}</p>
      <p>Booking Date: ${ticketData.bookingDateTime}</p>
      <p>Total Fare: ${ticketData.totalFare}</p>
      <h2>Passengers</h2>
      ${passengerContent}
    `;

    // Create PDF document

function Ticket({ bookingId }) {
  };

  return (    <div className="ticket-container">
  <button onClick={fetchTicketData}>Fetch Ticket Data</button>
  {ticketData && (
    <>
              <div className="ticket-details">
            <h2>Ticket Details</h2>
            <p>Bus No: {ticketData.busNo}</p>
            <p>From: {ticketData.from}</p>
            <p>To: {ticketData.to}</p>
            <p>Booking Date: {ticketData.bookingDateTime}</p>
            <p>Total Fare: {ticketData.totalFare}</p>
          </div>
          <div className="passenger-details">
            <h2>Passengers</h2>
            <ul>
              {ticketData.seatPassengerList.map((passenger, index) => (
                <li key={index}>
                  <p>Name: {passenger.passenger.firstName} {passenger.passenger.lastName}</p>
                  <p>Age: {passenger.passenger.age}</p>
                  <p>Gender: {passenger.passenger.gender}</p>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={generatePDF}>Generate PDF Ticket</button>
        </>
      )}
      {pdfContent && (
                <div className="pdf-container">
                <h2>Your Ticket</h2>
                <embed className="pdf-embed" src={pdfContent} type="application/pdf" width="600" height="400" />
          <a className="download-link" href={pdfContent} download="ticket.pdf">Download Ticket</a>
        </div>
      )}
    </div>
  );
}
Ticket.propTypes = {
    bookingId: PropTypes.string.isRequired
  };
  
  export default Ticket;