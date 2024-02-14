import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast,Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { axiosInst } from "src/axiosInstance";
import '@coreui/coreui/dist/css/coreui.min.css';


const AddRoute = () => {
    const navigate = useNavigate();
    const [stationList, setStationList] = useState([]);
    const[toList, setToList] = useState([]);
    const [routeData, setRouteData] = useState({
        stationIdFrom: "",
        stationIdTo: "",
        distance: 0,
    });

    useEffect(() => {
        fetchStationList();
    }, []);
    useEffect(() => {
     
    const filteredStations = stationList.filter(station => station.id != routeData.stationIdFrom);
    setToList(filteredStations);

    },[routeData]);


    const fetchStationList = () => {
        axiosInst
            .get("/station/getstations", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            })
            .then((response) => {
                setStationList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching stations:", error);
                toast.error("Failed to fetch stations");
            });
    };

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setRouteData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const addRouteAction = () => {
        if (
            routeData.distance < 2 ||
            routeData.stationIdFrom === "" ||
            routeData.stationIdTo === ""
        ) {
            toast.error("Please select valid details");
        } else {
            axiosInst
                .post("/route/addroute", routeData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                })
                .then((response) => {
                    if (response.data.message === "Route Added") {
                        toast.success("Route Added Successfully");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Something went wrong.");
                });
        }
    };

    return (
        <>
          <div style={{ position: "relative" }}>
    <form
      style={{
        width: "51%", // Increased width to 60%
        left: "1  %", // Adjusted left position
        position: "absolute",
        // boxShadow: "10px 10px 10px 5px grey",
        padding: "20px",
        marginTop: "10px",
    }}
    >
        <div className="form-group">
            <label htmlFor="exampleInputFrom">From</label>
            <select
                className="form-select"
                aria-label="Default select example"
                name="stationIdFrom"
                onChange={handleChanges}
                value={routeData.stationIdFrom}
            >
                <option value="">Select</option>
                {stationList.map((station) => (
                    <option key={station.id} value={station.id}>
                        {station.station_name}
                    </option>
                ))}
            </select>
         </div>

        <div className="form-group">
            <label htmlFor="exampleInputTo">To</label>
            <select
                className="form-select"
                aria-label="Default select example"
                name="stationIdTo"
                onChange={handleChanges}
                value={routeData.stationIdTo}
            >
                <option value="">Select</option>
                {toList.map((station) => (
                    <option key={station.id} value={station.id}>
                        {station.station_name}
                    </option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="exampleInputDistance">Distance</label>
            <input
                type="text"
                className="form-control"
                id="distance"
                name="distance"
                value={routeData.distance}
                onChange={handleChanges}
                placeholder="Enter Distance"
            />
        </div>
        <br />
        <button
            type="button"
            onClick={addRouteAction}
            className="btn btn-primary"
        >
            Add Route
        </button>
    </form>
</div>
<Toaster toastOptions={{ duration: 4000 }} />

        </>
    );
};

export default AddRoute;
