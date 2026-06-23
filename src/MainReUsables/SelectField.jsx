import React, { forwardRef, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FormControl, MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";

const SelectField = forwardRef(
  (
    {
      label,
      name,
      control,
      errors,
      required,
      dropDown,
      watch,
      register,
      onSelect,
      reset,
    },
    ref2
  ) => {
    const [isOpen, setIsOpen] = useState(false); // State to track dropdown open/close
    const [errMsg, setErrMsg] = useState([]);
    const dropdownRef = useRef(""); // Ref for dropdown element

    useEffect(() => {
      if (reset) {
        delete errors[name]; // Clear the error if text is within min and max
        setErrMsg([]);
      }
    }, [reset]);
    // Function to handle clicks outside of the dropdown
    const handleClickOutside = (event) => {
      // console.log("handleClickOutside isOpen--" + isOpen);
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setTimeout(function () {
          let text = watch(name); // Access the current value from the field object
          text = typeof text == "undefined" ? "" : text;
          // console.log("text--" + text);

          if (!required && text === dropDown[0].label) {
            delete errors[name];
            setErrMsg([]);
          } else if (required && text === dropDown[0].label) {
            errors[name] = {
              message: `${label} is required`,
            };
            setErrMsg(errors[name]);
          } else {
            delete errors[name];
            setErrMsg([]);
          }
          setIsOpen(false); // Close the dropdown if clicked outside
        }, 100);
      }
    };

    // Effect to add click event listener when component mounts
    useEffect(() => {
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [isOpen]);

    const onFocus = () => {
      setIsOpen(true);
    };

    const handleSelectionChange = (event) => {
      // Do something with the selected value
      const selectedValue = event.target.value;
      // console.log("Selected value:", selectedValue);
      let selectedItem = dropDown.find((item) => item.label === selectedValue);
      let selectedId = selectedItem ? selectedItem.id : null; // Extract the id value
      // console.log("key--" + selectedId); // Log the id value
      if (!required && selectedValue === dropDown[0].label) {
        delete errors[name];
        setErrMsg([]);
      } else if (required && selectedValue === dropDown[0].label) {
        errors[name] = {
          message: `${label} is required`,
        };
        setErrMsg(errors[name]);
      } else {
        delete errors[name];
        setErrMsg([]);
      }
      onSelect(selectedId, selectedValue);
      setIsOpen(false); // Close the dropdown if clicked outside
    };

    return (
      <FormControl fullWidth sx={{ mb: "1rem" }}>
        {/* Hidden input field to store the selected country's ID */}
        <input type="hidden" {...register(name + "Id")} />
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...addErrorIntoField(errors[name])}
              {...field}
              required={required}
              select
              label={label}
              variant="outlined"
              onFocus={onFocus} // Open dropdown when focused
              onChange={handleSelectionChange} // Handle selection change
              ref={dropdownRef}
              InputLabelProps={{
                className: "InputLabelStyle",
              }}
              sx={{ height: "52px" }}
            >
              {dropDown.map((val) => (
                <MenuItem key={val.id} value={val.label}>
                  {val.label}
                </MenuItem>
              ))}
            </TextField>
          )}
          ref2={ref2}
        />
        {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
      </FormControl>
    );
  }
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  dropDown: PropTypes.array.isRequired,
  required: PropTypes.bool,
  reset: PropTypes.bool,
};

SelectField.defaultProps = {
  errors: {},
  dropDown: [],
  register: undefined,
  onSelect: undefined,
  required: false,
  reset: false,
};

export default SelectField;
