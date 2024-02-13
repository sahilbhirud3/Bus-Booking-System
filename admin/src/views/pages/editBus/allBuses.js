import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { axiosInst } from "src/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowBuses = () => {
    const [buses, setBuses] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedBus, setEditedBus] = useState({});
    const [editedBusDetails, setEditedBusDetails] = useState({
        from: "",
        to: "",
        cost: "",
        duration: ""
    });

    useEffect(() => {
        fetchUserBuses();
    }, []); 

    const fetchUserBuses = () => {
        axiosInst
            .get("/bus/getallbuses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            })
            .then((response) => {
                setBuses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user buses:", error);
                toast.error("Failed to fetch user buses");
            });
    };

    const handleDelete = async (busId) => {
        try {
            const response = await axiosInst.delete(`/bus/deletebus/${busId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });
            
            if (response.data.message === "Bus deleted successfully") {
                setBuses(prevBuses => prevBuses.filter((bus) => bus.id !== busId));
                toast.success("Bus deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting bus:", error);
            toast.error("Failed to delete bus");
        }
    };

    const handleEdit = (bus) => {
        setEditedBus(bus);
        setEditedBusDetails({
            from: bus.from,
            to: bus.to,
            cost: bus.cost,
            duration: bus.duration
        });
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axiosInst.put(`/bus/updatebus/${editedBus.id}`, editedBusDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });

            if (response.data.message === "Bus updated successfully") {
                setBuses(prevBuses => prevBuses.map((bus) => 
                    bus.id === editedBus.id ? { ...bus, ...editedBusDetails } : bus
                ));
                toast.success("Bus updated successfully");
                setShowEditModal(false);
            }
        } catch (error) {
            console.error("Error updating bus:", error);
            toast.error("Failed to update bus");
        }
    };

    const handleChange = (e) => {
        setEditedBusDetails({ ...editedBusDetails, [e.target.name]: e.target.value });
    };

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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            {/* Edit Bus Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Bus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFrom">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter origin"
                                name="from"
                                value={editedBusDetails.from}
                                onChange={handleChange}
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
            
            <ToastContainer />
        </>
    );
};

export default ShowBuses;
