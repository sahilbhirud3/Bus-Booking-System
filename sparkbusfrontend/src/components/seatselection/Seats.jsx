import  { useState } from 'react'
import { useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api_ip from "./commonapi";
import Header from "../Header";
import Footer from "../Footer";

function Seat(props) {
    const { seatNumber, isSelected, onSelectSeat } = props;
    const seatClass = isSelected ? "btn-success" : "btn-light";
  
    return (
      <button
        className={`btn ${seatClass} m-2`}
        onClick={() => onSelectSeat(seatNumber)}
      >
        {seatNumber}
      </button>
    );
  }

function Seats() {

   
    
    const [passData, setPassData] = useState([]);
    const [selectedPass, setSelectedPass] = useState(0);
    
    const totalSeats = 30; // Total number of seats
    const [selectedSeat, setSelectedSeat] = useState(null);
    const busdata = JSON.parse(sessionStorage.getItem("busdata")).data;
   
  const handleSeatSelection = (seatNumber) => {
    if (selectedSeat === seatNumber) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatNumber);
    }
  };

  const handleChange = (e) => {
    setSelectedPass(e.target.value);
  };

  const busNo = JSON.parse(sessionStorage.getItem("busdata")).data.busno;
  const start = JSON.parse(sessionStorage.getItem("busdata")).data.from;
  const end = JSON.parse(sessionStorage.getItem("busdata")).data.to;
  const userId = JSON.parse(sessionStorage.getItem("userid"));
  const selectedPass1 = selectedPass;
  const date = JSON.parse(sessionStorage.getItem("busdata")).data.date;

  const dataToBeSent = {
    busNo: busNo,
    start: start,
    end: end,
    userId: userId,
    passengerId: selectedPass1,
    date: date,
    seatNo: selectedSeat,
  };

  useEffect(() => {
    axios
      .get(
        `${api_ip}/passenger/getpassengers/${sessionStorage.getItem(
          "userid"
        )}`
      )
      .then((response) => {
        setPassData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log(dataToBeSent)
    if (dataToBeSent.passengerId === 0) {
      if(sessionStorage.getItem("userid") == null){
        toast("Please Login.")
      }else{
        toast("Please select the passenger.");
      }
     
    } else if (dataToBeSent.seatNo === null) {
      toast("Please select the seat.");
    } else {
      axios
        .post(`${api_ip}/bookings/book`, dataToBeSent)
        .then((response) => {
          console.log(response.data)
          if (response.data.status == true) {
            toast("Ticket is booked.");
            // console
          
            axios
              .post(`${api_ip}/seats/seatbooking`, dataToBeSent)
              .then((response) => {
                if (response.data.status == true) {
                  toast("Seat allocated successfully.");
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => {
          console.log(error);
          toast("This seat is already booked.");
        });
    }
  };

  return (
    <>
    <Header/>
    <div className="container mt-5">
      <h1 className="text-center text-light">Bus Seat Selection</h1>
      <div className="row">
        <div className="col-12 col-md-6 bg-secondary">
          <div className="mb-4">
            <p>From: {busdata.from}</p>
            <p>To: {busdata.to}</p>
            <p>Departure Date: {busdata.date}</p>
          </div>
          <hr />
          <div className="mb-4">
            <p>Operator: Piyush travels</p>
            <p>Departure Time: {busdata.time}</p>
            <p>Duration: {busdata.duration}</p>
            <p>Arrival: {parseFloat(busdata.time) + parseFloat(busdata.duration)}</p>
            <p>Selected seat: {selectedSeat ? selectedSeat : "None"}</p>
            <p>Price: {busdata.cost}</p>
          </div>
          <hr />
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Select Passenger</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              onChange={handleChange}
            >
              <option value="" key="0">
                SELECT
              </option>
              {passData.length !== 0
                ? passData.map((e) => {
                    return (
                      <option value={e.id} key={e.id}>
                        {e.firstName + " " + e.lastName}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="text-center">
            <p style={{ color: "white", fontSize: "20px" }}>
              Select your seat:
            </p>
            <div className="d-flex flex-wrap justify-content-center">
              {Array.from({ length: totalSeats }, (_, index) => (
                <Seat
                  key={index}
                  seatNumber={index + 1}
                  isSelected={selectedSeat === index + 1}
                  onSelectSeat={handleSeatSelection}
                />
              ))}
            </div>
          </div>
          <button onClick={handleSubmit} className="btn btn-success mt-3">
            Pay & Book Seat
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
    <Footer/>
    </>
  )
}

export default Seats