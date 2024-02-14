import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { axiosInst } from "src/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { faTrash, faEdit, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowBuses = () => {
  const [buses, setBuses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedBus, setEditedBus] = useState({});
  const [editedBusDetails, setEditedBusDetails] = useState({
    from: "",
    to: "",
    cost: "",
    duration: "",
  });
  const [passengerList, setPassengerList] = useState([]);
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  useEffect(() => {
    fetchUserBuses();
  }, []);

  const fetchUserBuses = async () => {
    try {
      const response = await axiosInst.get("/bus/getallbuses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching user buses:", error);
      toast.error("Failed to fetch user buses");
    }
  };

  const handleDelete = async (busId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bus?"
    );

    if (!confirmed) {
      return;
    }

    const jwtToken = localStorage.getItem("jwtToken");
    try {
      const response = await axiosInst.delete(`/bus/deletebus/${busId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.data.body === "Bus removed successfully") {
        fetchUserBuses();
        toast.success("Bus deleted successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Bus not found:", error);
        toast.error("Bus not found");
      } else {
        console.error("Error deleting bus:", error);
        toast.error("Failed to delete bus as bus in use");
      }
    }
  };

  const handleEdit = async (bus) => {
    setEditedBus(bus);
    setEditedBusDetails({
      from: bus.from,
      to: bus.to,
      cost: bus.cost,
      duration: bus.duration,
    });

    // Fetch passengers for the selected bus
    try {
      const response = await axiosInst.get(`/passenger/bus/${bus.id}/seat-list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setPassengerList(response.data);
      setShowPassengerModal(true);
    } catch (error) {
      console.error("Error fetching passengers:", error);
      toast.error("Failed to fetch passengers");
    }
  };

  const handleClosePassengerModal = () => {
    setShowPassengerModal(false);
  };

  // Other methods remain unchanged

  return (
    <>
      <h2>User Buses</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Cost</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.from}</td>
              <td>{bus.to}</td>
              <td>{bus.cost}</td>
              <td>{bus.duration}</td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  color="blue"
                  onClick={() => handleEdit(bus)}
                  style={{ cursor: "pointer", marginRight: "5px" }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                  onClick={() => handleDelete(bus.id)}
                  style={{ cursor: "pointer" }}
                />
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  color="green"
                  onClick={() => handleEdit(bus)}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Passenger Modal */}
      <Modal show={showPassengerModal} onHide={handleClosePassengerModal}>
        <Modal.Header closeButton>
          <Modal.Title>Passenger List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Seat No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {passengerList.map((passenger, index) => (
                <tr key={index}>
                  <td>{passenger.seatNo}</td>
                  <td>{passenger.passenger.firstName}</td>
                  <td>{passenger.passenger.lastName}</td>
                  <td>{passenger.passenger.gender}</td>
                  <td>{passenger.passenger.age}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <Toaster toastOptions={{ duration: 4000 }} />
    </>
  );
};

export default ShowBuses;
