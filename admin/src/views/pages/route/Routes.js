import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import api_ip from "../commonapi";

function AllRoutes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`${api_ip}/route/allroutes`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setRoutes(res.data); // Update the state with the response data
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []); // Add an empty dependency array to run the effect only once on component mount

  // Handle delete action
  const handleDelete = async (routeId) => {
    // Add logic to delete the route
    console.log("Delete route with ID:", routeId);
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
