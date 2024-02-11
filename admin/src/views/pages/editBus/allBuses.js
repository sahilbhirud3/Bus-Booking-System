import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { axiosInst } from "src/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShowBuses = () => {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        fetchUserBuses();
    }, [buses]);

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
        const response = await axiosInst.delete(`/bus/removebus/${busId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        });
        
        if (response.data.message === "Bus deleted successfully") {
            setBuses(buses.filter((bus) => bus.id !== busId));
            toast.success("Bus deleted successfully");
        }
    } catch (error) {
        console.error("Error deleting bus:", error);
        toast.error("Failed to delete bus");
    }
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
            <ToastContainer />
        </>
    );
};

export default ShowBuses;
