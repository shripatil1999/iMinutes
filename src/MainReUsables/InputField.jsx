import { forwardRef, useEffect, useState } from "react";
import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";
import PropTypes from "prop-types"; // Import PropTypes
import { Height } from "@mui/icons-material";

const InputField = forwardRef(
  (
    {
      label,
      InputProps,
      control,
      name,
      errors,
      error,
      required,
      disabled,
      defaultValue,
      helperText,
      value,
      min,
      length,
      pattern,
      patternErrMsg,
      type,
      match,
      watch,
      minVal,
      maxVal,
      reset,
    },
    ref
  ) => {
    // const [errMsg, setErrMsg] = useState([]);

    const [errMsg, setErrMsg] = useState(errors[name]?.message || ""); // Initialize error message with initial value from errors object

    useEffect(() => {
      if (reset) {
        delete errors[name]; // Clear the error if text is within min and max
        setErrMsg([]);
      }
    }, [reset]);

    const onBlurFun = (e) => {
      let text = e.target.value.trim();

      if (!required && text == "") {
        delete errors[name]; // Clear the error if text is within min and max
        setErrMsg([]);
      } else if (required && text == "") {
        errors[name] = {
          message: `${label} is required`,
        };
        setErrMsg(errors[name]);
      } else if (min && text.length < min) {
        // Check if min length is defined and value is shorter
        errors[name] = {
          message: `${label} must be at least ${min} characters`,
        };
        setErrMsg(errors[name]);
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
          errors[name] = {
            message: msg,
          };
          setErrMsg(errors[name]);
        } else {
          delete errors[name]; // Clear the error if text is within min and max
          setErrMsg([]);
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
        errors[name] = {
          message: `${label} must be at least ${minVal}`,
        };
        setErrMsg(errors[name]);
      } else if (maxVal && parseInt(text) > maxVal) {
        errors[name] = {
          message: `${label} must be at most ${maxVal}`,
        };
        setErrMsg(errors[name]);
      } else if (pattern && !pattern.test(text)) {
        errors[name] = {
          message: patternErrMsg
            ? patternErrMsg
            : `${label} must contain at least one number, one uppercase letter, one special character`,
        };
        setErrMsg(errors[name]);
      } else if (match && text !== watch("password")) {
        // Check if confirmPassword matches password
        errors[name] = {
          message: `${label} must match the password`,
        };
        setErrMsg(errors[name]);
      } else {
        delete errors[name]; // Clear the error if text is within min and max
        setErrMsg([]);
      }
    };

    return (
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...addErrorIntoField(errors[name])}
              // required
              label={label}
              variant="outlined"
              disabled={disabled}
              defaultValue={defaultValue}
              helperText={helperText}
              onBlur={onBlurFun}
              error={error}
              type={type}
              value={value}
              InputProps={InputProps}
              ref={ref} // Forwarding the ref
              InputLabelProps={{
                className: "InputLabelStyle",
              }}
              sx={{ height: "52px" }}
            />
          )}
        />
        {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
      </FormControl>
    );
  }
);

// Define PropTypes for InputField component
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  InputProps: PropTypes.object,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  helperText: PropTypes.string,
  type: PropTypes.oneOf(["password", "text", "number"]), // Assuming it's either "password" or "text"
  min: PropTypes.number,
  minVal: PropTypes.number,
  maxVal: PropTypes.number,
  length: PropTypes.number,
  pattern: PropTypes.instanceOf(RegExp),
  patternErrMsg: PropTypes.string,
  match: PropTypes.bool,
  reset: PropTypes.bool,
};

// Default values for optional props
InputField.defaultProps = {
  InputProps: {
    inputProps: {
      maxLength: 50,
    },
  },
  type: "text",
  required: false,
  disabled: false,
  defaultValue: "",
  helperText: "",
  min: undefined,
  minVal: undefined,
  maxVal: undefined,
  length: undefined,
  pattern: undefined,
  patternErrMsg: undefined,
  match: false,
  errors: {},
  error: false,
  reset: false,
};

export default InputField;
