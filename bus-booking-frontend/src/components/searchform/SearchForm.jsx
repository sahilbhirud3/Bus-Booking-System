import { useState, useEffect } from "react";
import Select from "react-select";
import { axiosInst } from "../../service/axiosInstance";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardCarousel from "../cardCarousel/CardCarousel";
import BusDetailsCard from "../busCard/BusDetailsCard";
import {useNavigate} from "react-router-dom"

function SearchForm() {
  const [stationList, setStationList] = useState([]);
  const [selectedFromStation, setSelectedFromStation] = useState(null);
  const [selectedToStation, setSelectedToStation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [bus,setBuses]=useState([]);  
  const [noBusesFound, setNoBusesFound] = useState(false);
  const navigate=useNavigate()

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    fetchStationList();
  }, []);

  const fetchStationList = () => {
    axiosInst
      .get("/station/getstations")
      .then((response) => {
        setStationList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
      });
  };

  const handleFromChange = (selectedOption) => {
    setSelectedFromStation(selectedOption);
    setFilteredToOptions(
      stationList.filter((station) => station.id !== selectedOption.value)
    );
  };

  const handleToChange = (selectedOption) => {
    setSelectedToStation(selectedOption);
  };

  const [filteredToOptions, setFilteredToOptions] = useState(stationList);

  const search = () => {
    const requestBody = {
      from: selectedFromStation.value,
      to: selectedToStation.value,
      date: selectedDate.toLocaleDateString("en-CA"),
    };

    axiosInst
      .post("/bus/getbuses", requestBody)
      .then((response) => {
        console.log("Buses:", response.data);
        setBuses(response.data);
        if (response.data.length === 0) {
          setNoBusesFound(true);
          toast.warning(
            "Oops! Bus Not found for Date or Route"
          );
        } else {
          setNoBusesFound(false);
        }

      })
      .catch((error) => {
        console.error("Error fetching buses:", error);
      });
  };
  
  const handleBookNow=(id)=>{
  navigate(`/buslayout/${id}`)
 
  }
  useEffect(()=>{
 console.log(bus);
  },[bus])

  return (
    <div className="container mt-5">
      <div>
        <div className="row" style={{ paddingTop: "60px" }}>
          <div className="col-md-4">
            <label htmlFor="from">
              <b>From:</b>
            </label>
            <Select
              value={selectedFromStation}
              onChange={handleFromChange}
              options={stationList.map((station) => ({
                value: station.id,
                label: station.station_name,
              }))}
              placeholder="Search or Select..."
              isSearchable={true}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="to">
              <b>To:</b>
            </label>
            <Select
              value={selectedToStation}
              onChange={handleToChange}
              options={filteredToOptions.map((station) => ({
                value: station.id,
                label: station.station_name,
              }))}
              placeholder="Search or Select..."
              isSearchable={true}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="date">
              <b>Date:</b>
            </label>
            <br />
            <div style={{ position: "relative" }}>
              <input
                className="form-control"
                type="text"
                value={selectedDate.toLocaleDateString("en-CA")}
                onClick={toggleCalendar}
                readOnly
              />
              {showCalendar && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 999,
                    backgroundColor: "#fff",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-md-8 text-center">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={search}
            >
              Search
            </button>
            {noBusesFound && <p>Oops! We do not have any bus scheduled for given stations on that date</p>}
            {bus.map(bus => (
                <BusDetailsCard
                    key={bus.id}
                    busNo={bus.busNo}
                    from={bus.from}
                    to={bus.to}
                    startTime={bus.startTime}
                    endTime={bus.endTime}
                    duration={bus.duration}
                    fare={bus.cost}
                    handleBookNow={() => handleBookNow(bus.id)}
                />
            ))}
            <div className="container mt-5">
      <ToastContainer />
    </div>
          </div>
        </div>
</div>

        <CardCarousel />
 
      
    </div>
  );
}

export default SearchForm;
