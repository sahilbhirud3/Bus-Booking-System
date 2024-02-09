import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AllRoutes from "./AllRoutes";

const AddBus = () => {
  const [BusDetails, setBusDetails] = useState({
    busNo: "",
    totalSeats: "",
    date: "",
    time: "",
    routeId: "",
  });

  const handleChanges = (e) => {
    setBusDetails({ ...BusDetails, [e.target.name]: e.target.value });
  };

  const busData = () => {
    // Handle your bus data logic here
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="InputBusNo">Bus No</label>
              <input
                type="number"
                name="busNo"
                className="form-control"
                id="busno"
                value={BusDetails.busNo}
                onChange={handleChanges}
                placeholder="Enter Bus No"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="InputTotalSeats">Total Seats</label>
              <input
                type="number"
                name="totalSeats"
                className="form-control"
                id="totalseats"
                value={BusDetails.totalSeats}
                onChange={handleChanges}
                placeholder="Enter Total Seats"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="InputDate">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                id="date"
                value={BusDetails.date}
                onChange={handleChanges}
                placeholder="Enter Date"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="InputTime">Time</label>
              <input
                type="time"
                name="time"
                className="form-control"
                id="time"
                value={BusDetails.time}
                onChange={handleChanges}
                placeholder="Enter Time"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="InputRouteId">Route Id</label>
              <input
                type="number"
                name="routeId"
                className="form-control"
                id="routeid"
                value={BusDetails.routeId}
                onChange={handleChanges}
                placeholder="Enter Route Id"
                required
              />
            </div>
            <br/>

            <button
              type="button"
              onClick={busData}
              className="btn btn-primary"
            >
              Add Bus
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

export default AddBus;
