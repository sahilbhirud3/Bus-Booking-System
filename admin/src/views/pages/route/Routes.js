import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { axiosInst } from "src/axiosInstance";

function AllRoutes() {
  const [routes, setRoutes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedRoute, setEditedRoute] = useState({});
  const [editedRouteDetails, setEditedRouteDetails] = useState({
    distance: "",
    from: "",
    to: ""
  });

  useEffect(() => {
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
  }, []);

  const handleDelete = async (routeId) => {
    try {
      await axiosInst.delete(`/route/deleteroute/${routeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
      });
      setRoutes(routes.filter((route) => route.id !== routeId));
      console.log("Route deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (route) => {
    setEditedRoute(route);
    setEditedRouteDetails({
      distance: route.distance,
      from: route.from,
      to: route.to
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEditedRouteDetails({ ...editedRouteDetails, [e.target.name]: e.target.value });
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
                type="text"
                placeholder="Enter boarding point"
                name="from"
                value={editedRouteDetails.from}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTo">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination point"
                name="to"
                value={editedRouteDetails.to}
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
    </div>
  );
}

export default AllRoutes;
