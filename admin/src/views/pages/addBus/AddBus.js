import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { axiosInst } from "src/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import routes from "src/routes";
// import AllRoutes from "./AllRoutes";

const AddBus = () => {
  const [BusDetails, setBusDetails] = useState({
    busNo: "",
    totalSeats: "",
    date: "",
    time: "",
    id: "",
   
  });
  const [routeData, setRouteData] = useState({
    id: "",
    route: "",
});
    
  const [routes,setRoutes] = useState([]);
  const handleChanges = (e) => {
    const { name, value } = e.target;

    // If the target is the select element for the route
    if (name === 'route') {
        // Find the selected route object
        const selectedRoute = routes.find(route => route.id === value);
        
        // Update both BusDetails and routeData
        setBusDetails(prevDetails => ({
            ...prevDetails,
            id: value, // Add id to BusDetails
        
        }));
        setRouteData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    } else {
        // If it's not the route select, update only BusDetails
        setBusDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    }
};

  
   
  const busData = () => {
    
    console.log(BusDetails);



  };
  
  useEffect(()=>{
    axiosInst
    .get("/route/allroutes", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
    })
    .then((response) => {
        console.log(response.data);
        setRoutes(response.data);
        // setData();
    })
    .catch((error) => {
        console.error(error);
        toast.error("Something went wrong.");
    });

  },[])
  
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
                
                {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                        {/* {station.from} */}
                        {route.to} to {route.from}
                        {/* {route.route} */}
                        
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
