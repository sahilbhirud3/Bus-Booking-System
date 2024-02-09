import React, { useEffect,useState } from "react";
import { toast, Toaster } from "react-hot-toast";

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
  
  
  

const Contact = () => {
    const [contact, setContact] = useState([]);
  
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp._seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleString(); // Customize the format as needed
    };

    useEffect(() => {
      const fetchContact = async () => {
        try {
          const response = await fetch("http://localhost:4000/fetchContact");
          if(response.ok) {
            const data = await response.json();
            setContact(data);
          } else {
            console.error("Failed to fetch Contacts");
          }
        } catch (error) {
          console.error("Error fetching Contacts:", error);
        }
      };

      fetchContact();
    }, []);
    return (
        <>
        <Toaster toastOptions={{ duration: 4000 }} />
        <CCard className="mb-4">
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Index</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Subject</CTableHeaderCell>
                <CTableHeaderCell>Message</CTableHeaderCell>
                <CTableHeaderCell>Timestamp</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {contact.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                  {index+1}
                  </CTableDataCell>
    
                  <CTableDataCell>
                    <div>{item.name}</div>
                  </CTableDataCell>
    
                  <CTableDataCell>
                    <span>{item.email}</span>
                  </CTableDataCell>
    
                  <CTableDataCell>
                    <span>{item.subject}</span>
                  </CTableDataCell>
    
                  <CTableDataCell>
                    <span>{item.message}</span>
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

 


export default Contact;
