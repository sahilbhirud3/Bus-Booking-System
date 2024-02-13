import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { axiosInst } from "src/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import routes from "src/routes";
import "./styles.css"

const AddBus = () => {
  const [BusDetails, setBusDetails] = useState({
    busNo: "",
    totalSeats: "",
    startTime: "",
    endTime: "",
  });
  const [routeData, setRouteData] = useState({
    id: "",
    route: "",
  });

  const [routesData, setRoutesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);  
  };

  const handleEndData = (endDate) => {
    setEndDate(endDate);
  }

  const handleChanges = (e) => {
    const { name, value } = e.target;

    if (name === 'route') {
        const selectedRoute = routesData.find(route => route.id === value);
        
        setBusDetails(prevDetails => ({
            ...prevDetails,
            id: value,
        }));
        setRouteData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    } else {
        setBusDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    }
};

const busData = () => {
  if (!BusDetails.busNo || !BusDetails.totalSeats || !selectedDate || !endDate) {
      toast.error("Please fill in all fields.");
      return;
  }

  const startTimeISO = selectedDate.toISOString();
  const endTimeISO = endDate.toISOString();

  axiosInst
    .post(`/bus/addbus/${BusDetails.id}`, {
      busNo: BusDetails.busNo,
      totalSeats: BusDetails.totalSeats,
      startTime: startTimeISO,
      endTime: endTimeISO,
      routeId: BusDetails.id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success("Bus added successfully.");
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to add bus.");
    });
};

useEffect(() => {
    axiosInst
    .get("/route/allroutes", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    })
    .then((response) => {
        setRoutesData(response.data);
    })
    .catch((error) => {
        console.error(error);
        toast.error("Something went wrong.");
    });
}, []);

return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="InputRouteId">Route </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="route"
                onChange={handleChanges}
                value={routeData.route}
              >
                <option value="">Select</option>
                {routesData.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.from} to {route.to}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="InputBusNo">Bus No</label>
              <input
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
              <label htmlFor="InputDate">Start Date</label>
              <br/>
              <DatePicker
                name="startTime"
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm:ss"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
                value={selectedDate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputDate">End Date</label>
              <br/>
              <DatePicker
                name="endTime"
                selected={endDate}
                onChange={handleEndData}
                showTimeSelect
                timeFormat="HH:mm:ss"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
                value={endDate}
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddBus;
