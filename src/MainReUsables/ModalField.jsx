import React, { useRef, useEffect } from "react";
import warning from "/images/warning.png";
import success from "/images/success.png";
import error from "/images/error.png";
import info from "/images/info.png";
import close from "/images/close.svg";
import ButtonField from "./ButtonField";

function ModalField({ title, children, onClose, typeOfModal }) {
  const btnRef = useRef();

  useEffect(() => {
    btnRef.current.focus();
  }, []);

  return (
    <div className="bigModalOverlay">
      <div className="bigModalDisplay">
        <header className="flex justify-between ml-5 relative">
          <div className="font-bold">{title}</div>
          <img
            className="absolute w-6 h-6 -top-2 -right-1 cursor-pointer"
            src={close}
            alt="none"
            onClick={onClose}
          />
          {/* {typeOfModal === "Success" ? (
            <img width="60px" src={success} alt="none" />
          ) : typeOfModal === "Error" ? (
            <img width="60px" src={error} alt="none" />
          ) : typeOfModal === "Warning" ? (
            <img width="60px" src={warning} alt="none" />
          ) : (
            <img width="60px" src={info} alt="none" />
          )}
          <span
            style={{ marginLeft: "20px", fontSize: "32px", fontWeight: "bold" }}
          >
            {typeOfModal}
          </span> */}
        </header>
        <hr></hr>
        <div
          className="flex mb-4 overflow-y-auto"
          style={{ height: "calc(100vh - 221px)" }}
        >
          {children}
        </div>
        <hr></hr>
        <div className="flex mt-2">
          <div className="flex justify-end w-full">
            <ButtonField
              label="Close"
              // width="full" //take values full, or any percentage values
              position="end" //take values start, center, end
              type="submit" //can add props onClick, position, width
              onClick={onClose}
              btnRef={btnRef}
            />
            {/* <button
              className="btn btn-info buttonWidth100"
              ref={btnRef}s
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalField;
