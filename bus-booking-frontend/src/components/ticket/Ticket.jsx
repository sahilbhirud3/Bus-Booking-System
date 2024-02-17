import { useState } from 'react';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';


function Ticket({ bookingId }) {
  const [ticketData, setTicketData] = useState(null);
  const [pdfContent, setPdfContent] = useState('');

  // Function to fetch ticket data from the backend
  const fetchTicketData = async () => {
    try {
      const response = await fetch(`/api/tickets/${bookingId}`);
      const data = await response.json();
      setTicketData(data);
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    }
  };

  // Function to generate PDF ticket
  const generatePDF = () => {
    if (!ticketData) return;

    // Generate HTML content for the ticket
    const ticketContent = `
      <h1>Ticket Details</h1>
      <p>Name: ${ticketData.passengerName}</p>
      <p>Seat Number: ${ticketData.seatNumber}</p>
      <p>Departure Time: ${ticketData.departureTime}</p>
      <!-- Add more ticket details here -->
    `;

    // Create PDF document
    const pdf = new jsPDF();
    pdf.text(ticketContent, 10, 10); // Add HTML content to PDF

    // Save PDF content
    setPdfContent(pdf.output('datauristring'));
  };

  return (
    <div>
      <button onClick={fetchTicketData}>Fetch Ticket Data</button>
      {ticketData && (
        <>
          <h2>Ticket Details</h2>
          <p>Name: {ticketData.passengerName}</p>
          <p>Seat Number: {ticketData.seatNumber}</p>
          <p>Departure Time: {ticketData.departureTime}</p>
          {/* Add more ticket details here */}
          <button onClick={generatePDF}>Generate PDF Ticket</button>
        </>
      )}
      {pdfContent && (
        <div>
          <h2>Your Ticket</h2>
          <embed src={pdfContent} type="application/pdf" width="600" height="400" />
          <a href={pdfContent} download="ticket.pdf">Download Ticket</a>
        </div>
      )}
    </div>
  );
}


Ticket.prototype = {
    bookingId: PropTypes.string.isRequired
};

export default Ticket;

