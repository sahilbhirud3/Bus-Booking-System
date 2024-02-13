import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { axiosInst } from "src/axiosInstance";

function AllRoutes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch routes data when the component mounts
    axiosInst
      .get("/route/allroutes",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    })
      .then((res) => {
        console.log(res.data);
        setRoutes(res.data); // Update the state with the response data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Add an empty dependency array to run the effect only once on component mount

  // Handle delete action
  const handleDelete = async (routeId) => {
    try {
      // Send a delete request to the server
      console.log('====================================');
      console.log(routeId);
      console.log('====================================');
      await axiosInst.delete(`/route/deleteroute/${routeId}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    });
      // Filter out the deleted route from the state
      setRoutes(routes.filter((route) => route.id !== routeId));
      console.log("Route deleted successfully.");
    } catch (error) {
      console.log(error);
    }
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
    </div>
  );
}

export default AllRoutes;
