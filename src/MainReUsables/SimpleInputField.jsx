import { forwardRef, useEffect, useState } from "react";
import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";
import PropTypes from "prop-types"; // Import PropTypes

const SimpleInputField = forwardRef(
  (
    {
      id,
      label,
      InputProps,
      required,
      onChange,
      value,
      defaultValue,
      min,
      length,
      pattern,
      patternErrMsg,
      type,
      match,
      minVal,
      maxVal,
    },
    ref
  ) => {
    // const [errMsg, setErrMsg] = useState([]);

    const [errMsg, setErrMsg] = useState(""); // Initialize error message with initial value from errors object

    // useEffect(() => {
    //   // Update error message when errors object changes
    //   setErrMsg(errors[name]?.message || "");
    // }, [errors[name]]);

    const onBlurFun = (e) => {
      let text = e.target.value.trim();

      if (!required && text == "") {
        // delete errors[name]; // Clear the error if text is within min and max
        setErrMsg("");
      } else if (required && text == "") {
        // errors[name] = {
        //   message: `${label} is required`,
        // };
        setErrMsg(`${label} is required`);
      } else if (min && text.length < min) {
        // Check if min length is defined and value is shorter
        // errors[name] = {
        //   message: `${label} must be at least ${min} characters`,
        // };
        setErrMsg(`${label} must be at least ${min} characters`);
      } else if (length) {
        let msg = "";
        let msgFlag = true;
        if (pattern && !pattern.test(text)) {
          msg = patternErrMsg; //. ${label} must be exactly ${length} digits.
        } else {
          if (text.length !== length) {
            msg = `${label} must be exactly ${length} digits`;
          } else {
            msgFlag = false;
          }
        }
        if (msgFlag) {
          //   errors[name] = {
          //     message: msg,
          //   };
          setErrMsg(msg);
        } else {
          //   delete errors[name]; // Clear the error if text is within min and max
          setErrMsg("");
        }
      }
      // else if (length && text.length !== length) {
      //   let msg = "";
      //   if (pattern && !pattern.test(text)) {
      //     msg = `${patternErrMsg}. ${label} must be exactly ${length} characters.`;
      //   } else {
      //     msg = `${label} must be exactly ${length} characters`;
      //   }
      //   errors[name] = {
      //     message: msg,
      //   };
      //   setErrMsg(errors[name]);
      // }
      else if (minVal && parseInt(text) < minVal) {
        // errors[name] = {
        //   message: `${label} must be at least ${minVal}`,
        // };
        setErrMsg(`${label} must be at least ${minVal}`);
      } else if (maxVal && parseInt(text) > maxVal) {
        // errors[name] = {
        //   message: `${label} must be at most ${maxVal}`,
        // };
        setErrMsg(`${label} must be at most ${maxVal}`);
      } else if (pattern && !pattern.test(text)) {
        // errors[name] = {
        //   message: patternErrMsg
        //     ? patternErrMsg
        //     : `${label} must contain at least one number, one uppercase letter, one special character`,
        // };
        setErrMsg(patternErrMsg);
      } else if (match && text !== watch("password")) {
        // Check if confirmPassword matches password
        // errors[name] = {
        //   message: `${label} must match the password`,
        // };
        setErrMsg(`${label} must match the password`);
      } else {
        // delete errors[name]; // Clear the error if text is within min and max
        setErrMsg("");
      }
    };

    return (
      <FormControl id="KKKKK" fullWidth sx={{ mb: "1rem" }}>
        {/* <Controller
          render={({ field }) => ( */}
        <TextField
          // {...field}
          id={id}
          label={label}
          variant="outlined"
          onChange={onChange}
          onBlur={onBlurFun}
          // error={error}
          type={type}
          value={value}
          defaultValue={defaultValue}
          InputProps={InputProps}
          ref={ref} // Forwarding the ref
          InputLabelProps={{
            className: "InputLabelStyle",
          }}
          sx={{ height: "52px" }}
        />
        {/* )} */}
        {/* /> */}
        {errMsg ? <ErrorMessage message={errMsg} /> : null}
      </FormControl>
    );
  }
);

// Define PropTypes for SimpleInputField component
SimpleInputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  InputProps: PropTypes.object,
  required: PropTypes.bool,
  type: PropTypes.oneOf(["password", "text", "number"]), // Assuming it's either "password" or "text"
  min: PropTypes.number,
  minVal: PropTypes.number,
  maxVal: PropTypes.number,
  length: PropTypes.number,
  pattern: PropTypes.instanceOf(RegExp),
  patternErrMsg: PropTypes.string,
  match: PropTypes.bool,
  onChange: PropTypes.func,
};

// Default values for optional props
SimpleInputField.defaultProps = {
  id: "outlined-basic",
  InputProps: {
    inputProps: {
      maxLength: 50,
    },
  },
  type: "text",
  required: false,
  min: undefined,
  minVal: undefined,
  maxVal: undefined,
  length: undefined,
  pattern: undefined,
  patternErrMsg: undefined,
  match: false,
  onChange: () => {},
  defaultValue: undefined,
};

export default SimpleInputField;
