import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import PropTypes from "prop-types"; // Import PropTypes
import ErrorMessage from "./ErrorMessage";

export default function TextAreaField({
  label,
  required,
  minRows,
  maxRows,
  placeholder,
  maxLength,
  callBack,
  defaultValue,
}) {
  const [errMsg, setErrMsg] = React.useState(""); // Initialize error message with initial value from errors object
  const [value, setValue] = React.useState(defaultValue); // set initial value for textarea
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    resize: vertical;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const onBlurFun = (e) => {
    let text = e.target.value.trim();
    setValue(text);
    callBack(text);
    if (!required && text == "") {
      setErrMsg("");
    } else if (required && text == "") {
      setErrMsg(`${label} is required`);
    } else {
      setErrMsg("");
    }
  };

  return (
    <>
      <Textarea
        aria-label={label}
        // minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        maxLength={maxLength}
        onBlur={onBlurFun}
        defaultValue={defaultValue !== "" ? value : defaultValue}
        // onChange={(e) => {
        //   setValue(e.target.value);
        //   callBack(e.target.value);
        //   e.target.focus();
        // }}
      />
      {errMsg ? <ErrorMessage message={errMsg} /> : null}
    </>
  );
}

// Define PropTypes
TextAreaField.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  callBack: PropTypes.func,
  defaultValue: PropTypes.string,
};

// Define default values
TextAreaField.defaultProps = {
  label: "Description",
  required: false,
  minRows: 1,
  maxRows: 1,
  placeholder: "",
  maxLength: 500,
  callBack: () => {},
  defaultValue: "",
};
