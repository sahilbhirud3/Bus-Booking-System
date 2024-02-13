import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { axiosInst } from "../axiosInstance";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function SearchForm() {
  const [stationList, setStationList] = useState([]);
  const [selectedFromStation, setSelectedFromStation] = useState(null);
  const [selectedToStation, setSelectedToStation] = useState(null);
  //const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Hide the calendar after selecting a date
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Toggle the visibility of the calendar
  };
  useEffect(() => {
    fetchStationList();
  }, []);

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
    // Handle search functionality
    console.log("Searching...");
    console.log(selectedFromStation.value);
    console.log(selectedToStation.value);
      // Create the request body
      const requestBody = {
        from: selectedFromStation.value,
        to: selectedToStation.value,
        date: selectedDate.toLocaleDateString("en-CA") // Format the date as "yyyy-mm-dd"
      };
    
      // Make the API call to /bus/getbuses
      axiosInst
        .post("/bus/getbuses", requestBody)
        .then((response) => {
          // Handle the API response
          console.log("Buses:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching buses:", error);
        });
    
  };

  return (
    <div className="container mt-5">
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
            <Calendar onChange={handleDateChange} value={selectedDate} minDate={new Date()} />
          </div>
        )}
      </div>
    </div>
  </div>

  <div className="row justify-content-center mt-3">
    <div className="col-md-4 text-center">
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={search}
      >
        Search
      </button>
    </div>
  </div>
</div>

  );
}

export default SearchForm;
