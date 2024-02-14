import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import { rgbToHex } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import {
  CCard,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";



const ThemeView = () => {
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const ref = createRef();

  useEffect(() => {
    const el = ref.current.parentNode.firstChild;
    const varColor = window
      .getComputedStyle(el)
      .getPropertyValue("background-color");
    setColor(varColor);
  }, [ref]);

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  );
};

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, "theme-color w-75 rounded mb-3");
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: "75%" }}></div>
      {children}
      <ThemeView />
    </CCol>
  );
};

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const Payments = () => {
    let total=0;
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp._seconds * 1000); // Convert seconds to milliseconds
        return date.toLocaleString(); // Customize the format as needed
      };
      
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:4000/allbookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

const navigate=useNavigate()

const totalAmount = bookings.reduce((accumulator, item) => accumulator + item.amount, 0);

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <h5 style={{textAlign:"right"}}>Total Amount:{totalAmount}</h5>
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
            {bookings.map((item, index) => (
              
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                {index+1}
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.razorpayOrderId}</div>
                  
                </CTableDataCell>

                <CTableDataCell>
                  <span>{item.userId}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <span>{item.paymentId}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="clearfix">
                    <div className="float-start">
                      <div>
                        <span>&#8377;</span>
                        {item.amount}
                      </div>
                    </div>
                  </div>
                </CTableDataCell>
                <CTableDataCell>
                  <span>{formatTimestamp(item.timestamp)}</span>
                </CTableDataCell>
                

                

                
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  );
};

export default Payments;
