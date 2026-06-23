import React, { useRef, useEffect } from "react";
import warning from "../../public/images/warning.png";
import ButtonField from "./ButtonField";
import PropTypes from "prop-types";

// for Modal reusability
// https://deadsimplechat.com/blog/creating-a-reusable-pop-up-modal-in-react-from-scratch/

function ModalConfirmField({ message, saveData, onClose }) {
  const btnRef = useRef();

  return (
    <div className="modalOverlay">
      <div className="modalDisplay">
        <header className="flex items-center">
          <img width="50px " src={warning} alt="none" />
          <span
            style={{ marginLeft: "20px", fontSize: "32px", fontWeight: "bold" }}
          >
            Confirm
          </span>
        </header>
        <hr></hr>

        <div className="flex mb-4 mt-2">{message}</div>
        <hr></hr>
        <div className="flex mt-4">
          <div className="w-1/2 text-start">
            <ButtonField
              label="Yes"
              // width="full" //take values full, or any percentage values
              position="start" //take values start, center, end
              type="submit" //can add props onClick, position, width
              onClick={saveData}
              btnColor="success"
            />
          </div>
          <div className="w-1/2 text-end">
            <ButtonField
              label="No"
              // width="full" //take values full, or any percentage values
              position="end" //take values start, center, end
              type="submit" //can add props onClick, position, width
              onClick={onClose}
              btnColor="error"
              btnRef={btnRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ModalConfirmField.propTypes = {
  message: PropTypes.string.isRequired,
  saveData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalConfirmField.defaultProps = {
  message: "Are you sure you want to proceed?",
  saveData: () => {}, // Default saveData function does nothing
  onClose: () => {}, // Default onClose function does nothing
};

export default ModalConfirmField;
