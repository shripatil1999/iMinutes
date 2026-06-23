import React, { forwardRef } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form"; // Import Controller
import PropTypes from "prop-types"; // Import PropTypes
import ErrorMessage from "./ErrorMessage";
import { useEffect } from "react";

const RadioBtnField = forwardRef(
  ({ name, errors, control, label, buttons, reset, defaultValue }, ref) => {
    useEffect(() => {
      if (reset) {
        delete errors[name]; // Clear the error if text is within min and max
        // setErrMsg([]);
      }
    }, [reset]);
    return (
      <FormControl style={{ marginBottom: "0.75rem" }}>
        <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
        {/* Use Controller to bind radio group to react-hook-form's control */}
        <Controller
          name={name}
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <RadioGroup
              {...field}
              ref={ref}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              // value={defaultValue}
              defaultValue={defaultValue}
            >
              {buttons.map((key) => (
                <FormControlLabel
                  key={key}
                  value={key.toLowerCase()}
                  control={<Radio style={{ padding: "4px 9px" }} />}
                  label={key}
                />
              ))}
            </RadioGroup>
          )}
        />
        {errors[name] && <ErrorMessage message={errors[name].message} />}
      </FormControl>
    );
  }
);

// Define PropTypes
RadioBtnField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  buttons: PropTypes.array.isRequired,
  control: PropTypes.object.isRequired, // Include control in PropTypes
  errors: PropTypes.object.isRequired, // Include errors in PropTypes
  reset: PropTypes.bool,
};

// Define default values
RadioBtnField.defaultProps = {
  name: "",
  label: "",
  reset: false,
};

export default RadioBtnField;
