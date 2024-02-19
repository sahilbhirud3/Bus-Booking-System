import { useEffect } from "react";
import PropTypes from "prop-types";
import "./ConfirmationBox.css"; // Import the CSS file

function ConfirmationBox({ onClose, handleConfirm, confirmObject }) {
  const handleClick = () => {
    handleConfirm();
    onClose();
  };


  return (
    <div className="confirmation-box">
      <p>Are you sure you want to confirm?</p>
      <p>From: {confirmObject.from}</p>
      <p>To: {confirmObject.to}</p>
      <p>Bus Number: {confirmObject.busNo}</p>
      <p>No of Tickets: {confirmObject.noOfTickets}</p>
      <p>Cost: {confirmObject.cost}</p>
      
      <button onClick={handleClick}>Confirm</button>
    </div>
  );
}

ConfirmationBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  confirmObject: PropTypes.object.isRequired,
};

export default ConfirmationBox;