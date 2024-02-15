import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { axiosInst } from "src/axiosInstance";
import { Modal, Button } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";

const EditStationPopup = ({ show, handleClose, stationId }) => {
  const [stationName, setStationName] = useState("");
 
  const fetchStationDetails = async () => {
    try {
      const response = await axiosInst.get(`station/getstation/${stationId}`);
      console.log(response.data.station_name);
      setStationName(response.data.station_name);
    } catch (error) {
      console.error("Error fetching station details:", error);
    }
  };
  useEffect(() => {
    if (show && stationId) {
      fetchStationDetails();
    }
  }, [show, stationId]);

  const handleUpdateStation = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axiosInst.put(
        `station/updatestation/${stationId}`,
        { station_name: stationName },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
     
      if (response.status === 200) {
        console.log("Station updated successfully");
        toast.success("Station updated successfully");
        handleClose();
      } else {
        console.error("Failed to update station");
        toast.error("Failed to update station");
      }
    } catch (error) {
      console.error("Error updating station:", error);
      toast.error("Error updating station. Please try again later.");
    }
  };
//   useEffect(()=>{
//     fetchStationDetails()
//   },[])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Station</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
          placeholder="Enter station name"
          className="form-control"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateStation}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditStationPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  stationId: PropTypes.string.isRequired,
};

export default EditStationPopup;
