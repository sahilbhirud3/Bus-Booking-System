import React from "react";
import "./SearchForm.css"
import { useState, useEffect } from 'react';
import Select from 'react-select';


function SearchForm() {
  // State to manage the selected option and options fetched from the database
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  // Function to fetch options from the database
  const fetchOptionsFromDatabase = async () => {
    try {
      // Make an API call to fetch options from the database
      const response = await fetch('your_api_endpoint_here');
      const data = await response.json();

      // Map the data to the format required by react-select
      const formattedOptions = data.map(option => ({
        value: option.value,
        label: option.label
      }));

      // Update the options state with the fetched options
      setOptions(formattedOptions);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  // Fetch options when the component mounts
  useEffect(() => {
    fetchOptionsFromDatabase();
  }, []);

  // Function to handle option selection
  const handleSelectChange = selectedOption => {
    setSelectedOption(selectedOption);
  };

  return (
    <><div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="from">
            <b>From:</b>
          </label>
          <Select
            options={options} // Pass fetched options to the dropdown
            value={selectedOption} // Set the selected option
            onChange={handleSelectChange} // Handle option change event
            isSearchable // Enable searching
            placeholder="Type to search..." // Placeholder text
          />
          {/* Display selected option */}
          {selectedOption && <p>Selected Option: {selectedOption.label}</p>}
          
      </div>

      <div className="col-md-4">
        <label htmlFor="to">
          <b>To:</b>
        </label>
        <Select
            options={options} // Pass fetched options to the dropdown
            value={selectedOption} // Set the selected option
            onChange={handleSelectChange} // Handle option change event
            isSearchable // Enable searching
            placeholder="Type to search..." // Placeholder text
          />
      </div>

      <div className="col-md-4">
        <label htmlFor="from">
          <b>Date:</b>
        </label>

        <input type="date" name="dateofbirth" id="dateofbirth"></input>
      </div>
      <div className="col-md-4">
        <button
          //onClick={getBuses}
          type="button"
          className="btn btn-primary mb-2"
        >
          Search
        </button>
      </div>
    </div>
      {/* <ToastContainer /> */}
      <div className="row mt-4">
        {/* {buses.map((e) => {
      return (
        <div className="col-md-4" key={e.id}>
          <BusComp data={e} />
        </div>
      );
    })} */}
      </div>
    </div>



    <div class="card">
    <div class="card-content">
      <div class="data-row">
        <span>Image here</span>
        <div class="data-text">John Doe</div>
      </div>
      <div class="data-row">
        <span>I,age</span>
        <div class="data-text">john.doe@example.com</div>
      </div>
    </div>
    </div>
      </>
  );
}

export default SearchForm;

// const Select = () => {
//      return (
//           <Form.Group controlId="custom-select">
//                <Form.Label>Customized Select</Form.Label>
//                <Form.Control as="select" className="rounded-0 shadow">
//                     <option className="d-none" value="">
//                          Select Option
//                     </option>
//                     {["1", "2", "3", "4", "5"].map(option => (
//                          <option key={option}>Option {option}</option>
//                     ))}
//                </Form.Control>
//           </Form.Group>
//      );
// };
// export default Select;
