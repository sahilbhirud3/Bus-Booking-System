import { useState, useEffect } from "react";
import { MdOutlineChair } from "react-icons/md";
import { axiosInst } from "../../service/axiosInstance";
import { useParams } from "react-router-dom";
import "./BusLayout.css"; // Import CSS file
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRazorpay from "react-razorpay";

function BusLayout() {
  const [Razorpay] = useRazorpay();
  const [seats, setSeats] = useState([]);
  const [travelInfo, setTravelInfo] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false); // State to track booking success
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [isPassengerDetailsFilled, setIsPassengerDetailsFilled] =
    useState(false);
  const [verificationResult, setVerificationResult] = useState("");
  let totalSeats = 30;
  const { id } = useParams();




  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seat) => seat !== seatNumber)
      );
      setPassengerDetails((prevDetails) =>
        prevDetails.filter((passenger) => passenger.seatNumber !== seatNumber)
      );
    } else {
      if (!seats.includes(seatNumber)) {
        setSelectedSeats((prevSelectedSeats) => [
          ...prevSelectedSeats,
          seatNumber,
        ]);
        setPassengerDetails((prevDetails) => [
          ...prevDetails,
          { seatNumber, firstName: "", lastName: "", age: "", gender: "" },
        ]);
      } else {
        toast.error("Seat already booked", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleInputChange = (event, seatNumber, fieldName) => {
    const { value } = event.target;
    setPassengerDetails((prevDetails) =>
      prevDetails.map((passenger) =>
        passenger.seatNumber === seatNumber
          ? { ...passenger, [fieldName]: value }
          : passenger
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPassengerDetailsFilled) {
      toast.error("Enter passenger details", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const scriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (scriptLoaded) {
        try {
          const response = await axiosInst.post("/payment/razorpay", {
            amount: travelInfo.fare * passengerDetails.length,
          });

          const data = response.data;

          console.log(data);

          const options = {
            key: "rzp_test_bTDnw950m7Mzb4",
            currency: data.currency,
            amount: data.amount,
            name: "Spark Bus",
            description: "Spark Bus Booking ",
            // image: motocross,
            order_id: data.id,
            theme: {
              color: "#3bb19b",
            },
            handler: async function (response) {
              
              
              const payload = {
                 paymentId : response.razorpay_payment_id,
               razorpayOrderId : response.razorpay_order_id,
               razorpaySignature : response.razorpay_signature,
                busId: id, // Assuming busId is a fixed value or it can come from state
                userId: localStorage.getItem('id'), // Assuming userId comes from localStorage or state
                fare: travelInfo.fare * passengerDetails.length, // Calculating fare based on the number of passengers and fare per passenger
                seatPassengerList: passengerDetails.map((passenger) => ({
                  seatNo: passenger.seatNumber, // Assuming seat numbers start from 1
                  passenger: {
                    firstName: passenger.firstName,
                    lastName: passenger.lastName,
                    gender: passenger.gender,
                    age: passenger.age
                  }
                }))
              };
              try {
                const response1 = await axiosInst.post(
                  "/payment/verify-payment",
                 payload
                );

                const data = response1.data;

                if (data.success) {
                  setVerificationResult("Payment is successful");
                  toast.success("Payment Success");
                  setBookingSuccess(true); // Set booking success state to true
                } else {
                  setVerificationResult("Payment is not successful");
                  toast.error(data.message);
                }
              } catch (error) {
                console.error("Payment Verification Error:", error);
                setVerificationResult("Payment verification failed");
              }
            },
          };

          var rzp1 = new Razorpay(options);
          rzp1.open();
        } catch (error) {
          console.log("Failed to load Razorpay script.", error);
        }
      } else {
        console.log("Failed to load Razorpay script.");
      }

      
    }
  };

  const convertToValidDateTimeFormat = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year}: ${hours}:${minutes}`;
  };

  const calculateTotalTime = (startTime, endTime) => {
    try {
      if (!startTime || !endTime) {
        return "Invalid input";
      }

      const start = new Date(startTime);
      const end = new Date(endTime);

      let differenceMs = end - start;
      if (differenceMs < 0) {
        differenceMs += 24 * 60 * 60 * 1000;
      }

      const hours = Math.floor(differenceMs / (1000 * 60 * 60));
      const minutes = Math.floor(
        (differenceMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      return `${hours} hours ${minutes} minutes`;
    } catch (error) {
      console.error("Error calculating total time:", error);
      return "Invalid input";
    }
  };

  const renderSeats = () => {
    const seatElements = [];
    for (let i = 1; i <= totalSeats; i++) {
      const isSeatBooked = seats.includes(i);
      const isSeatSelected = selectedSeats.includes(i);
      seatElements.push(
        <div
          key={i}
          className={`bus-seat ${
            isSeatBooked
              ? "unavailable"
              : isSeatSelected
              ? "selected"
              : "available"
          }`}
          onClick={() => handleSeatClick(i)}
        >
          <MdOutlineChair className="seat-icon" />
          {i}
        </div>
      );
    }
    return seatElements;
  };

  const fetchBusById = async () => {
    try {
      const res = await axiosInst.get(`/seats/bus/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      console.log(res.data,"///////");
      setTravelInfo(res.data);
      totalSeats = res.data.totalSeats;
      // console.log(res.data,".............");
      setSeats(res.data.bookedSeats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsPassengerDetailsFilled(
      passengerDetails.every(
        (passenger) =>
          passenger.firstName &&
          passenger.lastName &&
          passenger.age &&
          passenger.gender
      ) && passengerDetails.length > 0
    );
  }, [passengerDetails]);

  useEffect(() => {
    fetchBusById();
  }, []);

  return (
    <>
      <div className="bus-seat-selection-page">
        <ToastContainer />
        <div className="left-section">
          <div className="upper-left">
            <h2>Travel Information</h2>
            <p className="line">Bus Number: {travelInfo.busNo}</p>
            <p className="line">
              <p>From: {travelInfo.from} </p>
              <p>To: {travelInfo.to}</p>
            </p>
            <p className="line">
              <p>
                Departure: {convertToValidDateTimeFormat(travelInfo.startTime)}
              </p>
              <p>
                Completion: {convertToValidDateTimeFormat(travelInfo.startTime)}
              </p>
            </p>
            <p className="line">
              Total Time:{" "}
              {calculateTotalTime(travelInfo.startTime, travelInfo.endTime)}
            </p>
          </div>
          <div className="lower-left">
            <h2>Passenger Details</h2>
            <form onSubmit={handleSubmit}>
              {passengerDetails.map((passenger) => (
                <div key={passenger.seatNumber}>
                  <label htmlFor={`firstName_${passenger.seatNumber}`}>
                    Seat {passenger.seatNumber}
                  </label>
                  <div className="passenger-form">
                    <div className="line">
                      <input
                        id={`firstName_${passenger.seatNumber}`}
                        type="text"
                        value={passenger.firstName || ""}
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            passenger.seatNumber,
                            "firstName"
                          )
                        }
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={passenger.lastName || ""}
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            passenger.seatNumber,
                            "lastName"
                          )
                        }
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="line">
                      <input
                        type="number"
                        value={passenger.age || ""}
                        onChange={(event) =>
                          handleInputChange(event, passenger.seatNumber, "age")
                        }
                        placeholder="Age"
                        min="0"
                      />
                      <select
                        value={passenger.gender || ""}
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            passenger.seatNumber,
                            "gender"
                          )
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button type="submit" disabled={selectedSeats.length === 0}>
                Book Ticket
              </button>
            </form>
            {bookingSuccess && (
              <div className="booking-success-message">
                <p>Yaay ... Booking Successful!</p>
              </div>
            )}
          </div>
        </div>
        <div className="right-section">
          <div className="main-card">
            <h2>Select your Seats</h2>
            <div className="seat-layout">
              <div>{renderSeats().slice(0, totalSeats / 2)}</div>
              <div>{renderSeats().slice(totalSeats / 2)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusLayout;
