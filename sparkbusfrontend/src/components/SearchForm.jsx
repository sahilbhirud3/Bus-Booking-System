import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { axiosInst } from "../axiosInstance";

function SearchForm() {
  const [stationList, setStationList] = useState([]);
  const [routeData, setRouteData] = useState({
    stationIdFrom: "",
    stationIdTo: "",
    distance: 0,
  });

  const handleFromChange = (selectedOption) => {
    if (selectedOption) {
      setRouteData((prevData) => ({
        ...prevData,
        stationIdFrom: selectedOption.value,
      }));
    } else {
      setRouteData((prevData) => ({
        ...prevData,
        stationIdFrom: "",
      }));
    }
  };

  const handleToChange = (selectedOption) => {
    if (selectedOption) {
      setRouteData((prevData) => ({
        ...prevData,
        stationIdTo: selectedOption.value,
      }));
    } else {
      setRouteData((prevData) => ({
        ...prevData,
        stationIdTo: "",
      }));
    }
  };

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

  useEffect(() => {
    fetchStationList();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="from">
            <b>From:</b>
          </label>
          <Select
            name="stationIdFrom"
            onChange={handleFromChange}
            value={
              stationList.find(
                (station) => station.id === routeData.stationIdFrom
              ) || ""
            }
            placeholder="Enter station"
            options={stationList.map((station) => ({
              value: station.id,
              label: station.station_name,
            }))}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="to">
            <b>To:</b>
          </label>
          <Select
            aria-label="Default select example"
            name="stationIdTo"
            onChange={handleToChange}
            value={
              stationList.find(
                (station) => station.id === routeData.stationIdTo
              ) || ""
            }
            placeholder="Enter station"
            options={stationList.map((station) => ({
              value: station.id,
              label: station.station_name,
            }))}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="from">
            <b>Date:</b>
          </label>
          <input type="date" name="dateofbirth" id="dateofbirth" />
        </div>

        <div className="col-md-4">
          <button type="button" className="btn btn-primary mb-2">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
