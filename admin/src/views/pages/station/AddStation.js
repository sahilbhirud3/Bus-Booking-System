import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { axiosInst } from "src/axiosInstance";
// import AllRoutes from "./AllRoutes";

const AddStation = () => {
  const [stationName, setStationName] = useState("");
  const [stations, setStations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = () => {
    axiosInst
      .get("station/getstations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        setStations(response.data);
      })
      .catch((error) => {
        setShowAlert(true);
        console.error("Error:", error);
      });
  };

  const handleChanges = (e) => {
    setStationName(e.target.value);
  };

  const stationData = () => {
    // Check if stationName is not empty
    if (stationName.trim() === "") {
      toast.error("Please enter a station name");
      return;
    }

    // Check for duplicate station names
    const stationExists = stations.some(
      (station) => station.station_name === stationName
    );

    if (stationExists) {
      toast.error("Station already exists");
    } else {
      axiosInst
        .post(
          "station/addstation",
          {
            station_name: stationName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          if (response.data.message === "Station added Successfully") {
            toast.success("Station added Successfully");
            // Clear station name after successful addition
            setStationName("");
            // Fetch stations again to update the list
            fetchStations();
          } else {
            toast.error("Station Not added!");
          }
        })
        .catch((error) => {
          setShowAlert(true);
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="InputBusNo">Station Name</label>
              <input
                type="text"
                name="Station Name"
                className="form-control"
                id="stationName"
                value={stationName}
                onChange={handleChanges}
                placeholder="Enter Station Name"
                required
              />
            </div>
            <br />
            <button
              type="button"
              onClick={stationData}
              className="btn btn-primary"
            >
              Add Station
            </button>
          </form>
        </div>
        <div className="col-md-6 text-right">
          {/* <AllRoutes /> */}
        </div>
      </div>
      
      <Toaster toastOptions={{ duration: 4000 }} />
    </div>
  );
};

export default AddStation;
