import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import { rgbToHex } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import { toast, Toaster } from "react-hot-toast";
import { axiosInst } from "src/axiosInstance";

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

const Stations = () => {
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp._seconds * 1000); // Convert seconds to milliseconds
        return date.toLocaleString(); // Customize the format as needed
      };

    const [stations, setStations] = useState([]);
    useEffect(() => {
    const fetchStations = async () => {
      axiosInst
      .get("station/getstations")
      .then((response) => {
        console.log("Response:", response.data);
        setStations(response.data)
        
      })
      .catch((error) => {
        // setShowAlert(true);
        console.error("Error:", error);
        // Handle errors if any
      });
    };

    fetchStations();
  }, []);

const navigate=useNavigate()

const handleDelete = async (stationId) => {
  // Display a confirmation dialog before proceeding with the deletion
  const confirmed = window.confirm("Are you sure you want to delete this station?");
  
  if (!confirmed) {
    return; // If the user cancels, exit the function
  }

  try {
    const jwtToken = localStorage.getItem("jwtToken");

    const response = await axiosInst.delete(`station/deletestation/${stationId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    console.log("Response:", response);

    if (response.status === 200 || response.status === 204) {
      console.log("Station deleted successfully");
      // After successful deletion, fetch the updated list of stations
      const updatedStations = stations.filter((station) => station.id !== stationId);
      setStations(updatedStations);
    } else {
      console.error("Failed to delete station");
    }
  } catch (error) {
    console.error("Error deleting station:", error);
  }
};

 

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
    
      <CCard className="mb-4">
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Index</CTableHeaderCell>
            <CTableHeaderCell>Station Name</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {stations.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
              <CTableDataCell>
                <div>{item.station_name}</div>
              </CTableDataCell>
              <CTableDataCell>
                
                <span style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faTrash} color="red" onClick={() => handleDelete(item.id)} />
                </span>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCard>
    </>
  );
};
export default Stations;