import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { axiosInst } from "src/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

import {
  faTrash,
  faEdit,
  faInfoCircle,
  faDownload,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
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
  const [passengerList, setPassengerList] = useState({});
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleEdit = (bus) => {
    setEditedBus(bus);
    setEditedBusDetails({
      busNo:bus.busNo,
      from: bus.from,
      to: bus.to,
      cost: bus.cost,
      duration: bus.duration,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axiosInst.put(
        `/bus/updatebus/${editedBus.id}`,
        editedBusDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.data === "Bus updated successfully") {
        setBuses((prevBuses) =>
          prevBuses.map((bus) =>
            bus.id === editedBus.id ? { ...bus, ...editedBusDetails } : bus
          )
        );
        toast.success("Bus updated successfully");
        // fetchBuses();
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error updating bus:", error);
      toast.error("Failed to update bus");
    }
  };

  const handleChange = (e) => {
    setEditedBusDetails({
      ...editedBusDetails,
      [e.target.name]: e.target.value,
    });
  };

  const fetchBuses = async () => {
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
  const handleDownload = () => {
    const pdf = new jsPDF();
    const logoDataUrl =
      "data:image/png;base64,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";
    // Add watermark

    // Add header with download date and site name
    const downloadDate = new Date().toLocaleDateString();
    const siteName = "https:localhost:3001/"; // Update with your site name
    pdf.setFontSize(8);
    pdf.text(
      `Site Name: ${siteName}  |  Download Date: ${downloadDate}`,
      110,
      10
    );

    pdf.addImage(logoDataUrl, "PNG", 10, 15, 40, 40);

    // Set font size and add title
    pdf.setFontSize(20);
    pdf.text("Spark Buses", 60, 30);

    // Add bus details as a header
    const startY = 50;
    const startX = 10; // Adjust startY position for bus details
    pdf.setFontSize(12);
    pdf.text(`Bus No: ${passengerList.busNo}`, startX + 5, startY + 10);
    pdf.text(`From: ${passengerList.from}`, startX + 5, startY + 20);
    pdf.text(`To: ${passengerList.to}`, startX + 5, startY + 30);
    pdf.text(
      `Start Time: ${new Date(passengerList.startTime).toLocaleString()}`,
      startX + 5,
      startY + 40
    );
    pdf.text(
      `End Time: ${new Date(passengerList.endTime).toLocaleString()}`,
      startX + 5,
      startY + 50
    );
    pdf.text(
      `Total Seats: ${passengerList.totalSeats}`,
      startX + 5,
      startY + 60
    );

    // Set up headers for the table
    const headers = ["Seat No", "First Name", "Last Name", "Gender", "Age"];

    // Set up data for the table
    const tableData = [];

    for (let seatNo = 1; seatNo <= passengerList.totalSeats; seatNo++) {
      const passenger = passengerList.seatList.find(
        (seat) => seat.seatNo === seatNo
      );
      if (passenger) {
        tableData.push([
          passenger.seatNo,
          passenger.passenger.firstName,
          passenger.passenger.lastName,
          passenger.passenger.gender,
          passenger.passenger.age,
        ]);
      } else {
        tableData.push([seatNo, "--", "--", "--", "--"]);
      }
    }

    // Add the table to the PDF
    pdf.autoTable({
      startY: 120, // Start table below bus details
      head: [headers],
      body: tableData,
    });
    // Add footer
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pdf.internal.pageSize.width / 2,
        pdf.internal.pageSize.height - 10,
        "center"
      );
      pdf.text(
        "This is a system-generated PDF. For support contact : +91 8600386608",
        pdf.internal.pageSize.width / 2,
        pdf.internal.pageSize.height - 5,
        "center"
      );
    }
    // Save the PDF
    pdf.save(`passenger_list_ ${passengerList.busNo}_.pdf`);
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
        fetchBuses();
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

  const handleView = async (bus) => {
    setEditedBus(bus);
    setEditedBusDetails({
      from: bus.from,
      to: bus.to,
      cost: bus.cost,
      duration: bus.duration,
    });

    // Fetch passengers for the selected bus
    try {
      const response = await axiosInst.get(
        `/passenger/bus/${bus.id}/seat-list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 204) {
        // Show popup indicating no passengers in the bus
        toast.info("No passengers in the bus.");
      } else {
        // Passengers are available, set the passenger list and show the modal
        setPassengerList(response.data);
        setShowPassengerModal(true);
      }
    } catch (error) {
      console.error("Error fetching passengers:", error);
      toast.error("No passengers in the bus.");
    }
  };

  const handleClosePassengerModal = () => {
    setShowPassengerModal(false);
  };

  // Other methods remain unchanged

  return (
    <>
      <h2>All Buses</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>BusNo</th>
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
              <td>{bus.busNo}</td>
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
                  icon={faEye}
                  color="green"
                  onClick={() => handleView(bus)}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showPassengerModal} onHide={handleClosePassengerModal}>
        <Modal.Header closeButton>
          <p>
            <Modal.Title>Bus Details</Modal.Title>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div id="modal-content">
            <p>
              <Modal.Title>Passenger List</Modal.Title>
            </p>
            <p>Bus No: {passengerList.busNo}</p>
            <p>From: {passengerList.from}</p>
            <p>
              Start Time: {new Date(passengerList.startTime).toLocaleString()}
            </p>
            <p>To: {passengerList.to}</p>
            <p>End Time: {new Date(passengerList.endTime).toLocaleString()}</p>
            <p>Total Seats: {passengerList.totalSeats}</p>
          </div>
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
              {[...Array(passengerList.totalSeats).keys()].map((seatNo) => (
                <tr key={seatNo}>
                  <td>{seatNo + 1}</td>
                  {passengerList.seatList?.some(
                    (detail) => detail.seatNo === seatNo + 1
                  ) ? (
                    passengerList.seatList.find(
                      (detail) => detail.seatNo === seatNo + 1
                    ) ? (
                      <>
                        <td>
                          {
                            passengerList.seatList.find(
                              (detail) => detail.seatNo === seatNo + 1
                            ).passenger.firstName
                          }
                        </td>
                        <td>
                          {
                            passengerList.seatList.find(
                              (detail) => detail.seatNo === seatNo + 1
                            ).passenger.lastName
                          }
                        </td>
                        <td>
                          {
                            passengerList.seatList.find(
                              (detail) => detail.seatNo === seatNo + 1
                            ).passenger.gender
                          }
                        </td>
                        <td>
                          {
                            passengerList.seatList.find(
                              (detail) => detail.seatNo === seatNo + 1
                            ).passenger.age
                          }
                        </td>
                      </>
                    ) : (
                      <>
                        <td>- -</td>
                        <td>- -</td>
                        <td>- -</td>
                        <td>- -</td>
                      </>
                    )
                  ) : (
                    <>
                      <td>- -</td>
                      <td>- -</td>
                      <td>- -</td>
                      <td>- -</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} color="white" />
            &nbsp;PDF
          </button>
        </Modal.Footer>
      </Modal>
      {/* Edit Bus Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBusNo">
            <Form.Label>Bus Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bus number"
              name="busNo"
              value={editedBusDetails.busNo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form>
            <Form.Group controlId="formFrom">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter origin"
                name="from"
                value={editedBusDetails.from}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formTo">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                name="to"
                value={editedBusDetails.to}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formCost">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter cost"
                name="cost"
                value={editedBusDetails.cost}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter duration"
                name="duration"
                value={editedBusDetails.duration}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster toastOptions={{ duration: 4000 }} />
    </>
  );
};

export default ShowBuses;
