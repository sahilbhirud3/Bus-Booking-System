import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { axiosInst } from "src/axiosInstance";
import { toast,Toaster } from "react-hot-toast"; // Import Toaster from react-hot-toast
import 'react-toastify/dist/ReactToastify.css';

function AllRoutes() {
    const [routes, setRoutes] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedRoute, setEditedRoute] = useState({});
    const [stations, setStations] = useState([]);
    const [editedRouteDetails, setEditedRouteDetails] = useState({
        distance: "",
        stationIdFrom: "",
        stationIdTo: ""
    });

    useEffect(() => {
        // Fetch all stations
        axiosInst
            .get("/station/getstations", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
            .then((res) => {
                console.log('====================================');
                console.log(res.data);
                console.log('====================================');
                setStations(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
   fetchroute();
        // Fetch all routes
        
    }, []);

    const fetchroute=()=>{
        axiosInst
            .get("/route/allroutes", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
            .then((res) => {
                setRoutes(res.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const handleDelete = async (routeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this route?");

        if (!confirmed) {
            return;
        }

        try {
            const jwtToken = localStorage.getItem("jwtToken");
            await axiosInst.delete(`/route/deleteroute/${routeId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setRoutes(routes.filter((route) => route.id !== routeId));
            toast.success("Route deleted successfully.");
            console.log("Route deleted successfully.");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error("Failed to delete route: Route is in use.");
                toast.error("Failed to delete route: Route is in use.");
            } else {
                console.error("Error deleting route:", error);
                toast.error("Failed to delete route. Please try again later.");
            }
        }
    };

    const handleEdit = (route) => {
        setEditedRoute(route);
        setEditedRouteDetails({
            distance: route.distance,
            stationIdFrom: route.fromId,
            stationIdTo: route.toId
        });
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleSaveEdit = async () => {
        try {
            await axiosInst.put(`/route/updateroute/${editedRoute.id}`, editedRouteDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            setRoutes(routes.map((route) =>
                route.id === editedRoute.id ? { ...route, ...editedRouteDetails } : route
            ));
            setShowEditModal(false);
            console.log("Route updated successfully.");
            fetchroute();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setEditedRouteDetails({ ...editedRouteDetails, [e.target.name]: e.target.value });
        // console.log(JSON.stringify(editedRouteDetails));
    };

    return (
        <div>
        <h2>All Routes</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Route Id</th>
                    <th>Distance</th>
                    <th>Boarding</th>
                    <th>Destination</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {routes.map((route) => (
                    <tr key={route.id}>
                        <td>{route.id}</td>
                        <td>{route.distance}</td>
                        <td>{route.from}</td>
                        <td>{route.to}</td>
                        <td>
                            <FontAwesomeIcon
                                icon={faEdit}
                                color="blue"
                                onClick={() => handleEdit(route)}
                                style={{ cursor: "pointer", marginRight: "5px" }}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                color="red"
                                onClick={() => handleDelete(route.id)}
                                style={{ cursor: "pointer" }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

        <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Route</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDistance">
                        <Form.Label>Distance</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter distance"
                            name="distance"
                            value={editedRouteDetails.distance}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formFrom">
                        <Form.Label>Boarding</Form.Label>
                        <Form.Control
                            as="select"
                            name="stationIdFrom"
                            value={editedRouteDetails.stationIdFrom} 
                            onChange={handleChange}
                        >
                            {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.station_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>   

                    <Form.Group controlId="formTo">
                        <Form.Label>Destination</Form.Label>
                        <Form.Control
                            as="select"
                            name="stationIdTo"
                            value={editedRouteDetails.stationIdTo}
                            onChange={handleChange}
                        >
                            {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.station_name}
                                </option>
                            ))}
                        </Form.Control>
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
    </div>
    );
}

export default AllRoutes;
