import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./MyBookings.css";
import { axiosInst } from '../../service/axiosInstance';
import jsPDF from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month} ${hours}:${minutes}`;
}

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function MyBookings() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const storedId = localStorage.getItem("id");

    if (!jwtToken) {
      window.location = "/login";
    } else if (id !== storedId) {
      window.location =`/bookings/${storedId}`;
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
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

  const downloadTicket = async (ticketid) => {
    try {
      const response = await axiosInst.get(`/bookings/getbooking/${ticketid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
  
      const ticketDetails = response.data;
  
      const doc = new jsPDF();
  
      // Top Block - Date and Title
      doc.setFontSize(12);
      const currentDate = new Date().toLocaleDateString();
      doc.text(currentDate, 10, 10);
      doc.setFontSize(18);
      doc.text("SPARK BUS", doc.internal.pageSize.width / 2, 10, 'center');
  
      // Top 2nd Block - Logo, ETicket, and Help Information
      doc.addImage('../../assets/images/logo.jpg', 'JPEG', 10, 20, 50, 50); // Adjust the image dimensions as per your logo size
      doc.setFontSize(16);
      doc.text("E-Ticket", doc.internal.pageSize.width / 2, 40, 'center');
      doc.setFontSize(12);
      doc.text("Need help?", doc.internal.pageSize.width - 20, 20, 'right');
      doc.text("9867454532", doc.internal.pageSize.width - 20, 30, 'right');
      doc.text("help@sparkbus.in", doc.internal.pageSize.width - 20, 40, 'right');
  
      // Top 3rd Block - Ticket Details
      let yPosition = 70; // Start position for ticket details
      doc.text(`Ticket Details for Booking ID ${ticketid}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Bus No: ${ticketDetails.busNo}`, 10, yPosition);
      yPosition += 10;
      doc.text(`From: ${ticketDetails.from} at ${formatDateTime(ticketDetails.startTime)}`, 10, yPosition);
      yPosition += 10;
      doc.text(`To: ${ticketDetails.to} at ${formatDateTime(ticketDetails.endTime)}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Booking Date: ${formatDate(ticketDetails.bookingDateTime)}`, 10, yPosition);
      yPosition += 10;
      // Calculate and display total passengers count
      const totalPassengers = ticketDetails.seatPassengerList.length;
      doc.text(`Total Passengers: ${totalPassengers}`, 10, yPosition);
      yPosition += 20; // Add space
  
      // Last Block - Terms and Conditions
      const termsAndConditions = `Terms and Conditions:
      1. Please arrive at the boarding point 30 minutes before departure time.
      2. No refunds or cancellations are allowed after booking.
      3. Passengers are responsible for their belongings during the journey.
      `;
      doc.text(termsAndConditions, 10, doc.internal.pageSize.height - 50);
  
      doc.save(`ticket_${ticketid}.pdf`);
    } catch (error) {
      console.error("Error downloading ticket:", error);
      toast.error("Ticket Not Downloading, Please try again")
    }
  };
  
  

  return (
    <div className="login_container">
      <ToastContainer/>
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
                  <th>Download Ticket</th>
                </tr>
              </thead>
              <tbody>
                {data.slice().reverse().map(location => (
                  <tr key={location.id}>
                    <td>{location.busNo}</td>
                    <td>{location.from} at {formatDateTime(location.startTime)}</td>
                    <td>{location.to} at {formatDateTime(location.endTime)}</td>
                    <td>{formatDate(location.bookingDateTime)}</td>
                    <td>{location.totalFare}</td>
                    <td>
                      <button className='button download' onClick={() => downloadTicket(location.id)}>Download Ticket</button>
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