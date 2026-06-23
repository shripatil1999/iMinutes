import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
import { useEffect } from "react";

const ButtonField = ({
  label,
  type,
  onClick,
  position,
  width,
  btnColor,
  btnRef,
}) => {
  useEffect(() => {
    if (btnRef) {
      btnRef.current.focus();
    }
  }, []);

  position = position
    ? position === "start"
      ? "justify-start"
      : position === "center"
      ? "justify-center"
      : position === "end"
      ? "justify-end"
      : ""
    : "";

  width = width === "full" ? "100%" : width;

  return (
    <div className={`flex items-center ${position}`}>
      <Button
        variant="contained"
        color={btnColor}
        type={type}
        onClick={onClick}
        ref={btnRef}
        style={{ minWidth: width }}
      >
        <Typography className="normal-case" color="white">
          {label}
        </Typography>
      </Button>
    </div>
  );
};

ButtonField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["submit", "button"]),
  onClick: PropTypes.func,
  position: PropTypes.oneOf(["start", "center", "end"]),
  width: PropTypes.string,
  btnColor: PropTypes.string,
  btnRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ButtonField.defaultProps = {
  type: "submit",
  onClick: () => {},
  position: undefined,
  width: "90px",
  btnColor: "primary",
  btnRef: undefined,
};

export default ButtonField;
