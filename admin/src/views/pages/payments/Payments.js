import React, { useState, useEffect } from "react";
import { CCard, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { axiosInst } from "src/axiosInstance";

const Payments = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInst.get("/bookings/getbookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        if (response && response.data) {
          setBookings(response.data);
          console.log('====================================');
          console.log(response.data);
          console.log('====================================');
          const totalAmount = response.data.reduce((acc, booking) => acc + booking.totalFare, 0);
          setTotalAmount(totalAmount);

        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleString();
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <h5 style={{ textAlign: "right" }}>Total Amount: {totalAmount}</h5>
      <CCard className="mb-4">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">Index</CTableHeaderCell>
              <CTableHeaderCell>Booking ID</CTableHeaderCell>
              <CTableHeaderCell>User ID</CTableHeaderCell>
              <CTableHeaderCell>Payment ID</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Timestamp</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {bookings.map((booking, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                <CTableDataCell>{booking.razorpayOrderId}</CTableDataCell>
                <CTableDataCell>{booking.userId}</CTableDataCell>
                <CTableDataCell>{booking.paymentId}</CTableDataCell>
                <CTableDataCell>
                  <div className="clearfix">
                    <div className="float-start">
                      <div>
                        <span>&#8377;</span>
                        {booking.totalFare}
                      </div>
                    </div>
                  </div>
                </CTableDataCell>
                <CTableDataCell>{booking.bookingDateTime}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  );
};

export default Payments;
