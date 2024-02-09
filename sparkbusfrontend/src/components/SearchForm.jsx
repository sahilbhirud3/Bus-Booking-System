import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SearchForm() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="from">
            <b>From:</b>
          </label>
          <select
            className="form-control"
            style={{ width: "260px" }}
            name="from"
            // onChange={handleGetBusDataChange}
          >
            <option>select</option>
            {/* {stationList.map((e) => {
              return (
                <option value={e.id} key={e.id}>
                  {e.station_name}
                </option>
              );
            })} */}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="to">
            <b>To:</b>
          </label>
          <select
            name="to"
            //onChange={handleGetBusDataChange}
            className="form-control"
            style={{ width: "260px" }}
          >
            <option>select</option>

            {/* {stationList.map((e) => {
              return (
                <option value={e.id} key={e.id}>
                  {e.station_name}
                </option>
              );
            })} */}
          </select>
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
