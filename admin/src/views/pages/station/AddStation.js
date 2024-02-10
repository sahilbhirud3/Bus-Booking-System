import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInst } from "src/axiosInstance";
// import AllRoutes from "./AllRoutes";

const AddStation = () => {
  const [stationName, setStationName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleChanges = (e) => {
    setStationName(e.target.value );
  };

  const stationData = () => {
    
    axiosInst
    .post("station/addstation", {
      station_name: stationName
    
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}` // Add the JWT token here
      }
    })
    .then((response) => {
      console.log("Response:", response.data);
      if (
        response.data.message === "Station added Successfully"
      ) {
        
        toast.success("Station added Successfully");
       
      } else {
        toast.error("Station Not added!");
      }

      // Handle the response data as needed
    })
    .catch((error) => {
      setShowAlert(true);
      console.error("Error:", error);
      // Handle errors if any
    });


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

           <br></br>

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
      <ToastContainer />
    </div>
  );
};

export default AddStation;
