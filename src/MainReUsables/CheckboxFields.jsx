import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const CheckboxFields = ({
  setValue,
  name,
  errors,
  control,
  required,
  errorMsg,
  checked,
  setChecked,
  size,
  label,
  color,
  disabled,
  reset,
}) => {
  const [errMsg, setErrMsg] = useState(errors[name]?.message || "");

  const checkBoxRef = useRef();
  useEffect(() => {
    if (!checked && setValue) {
      setValue(name, false);
    }
  }, []);

  useEffect(() => {
    if (reset) {
      delete errors[name]; // Clear the error if text is within min and max
      setErrMsg([]);
    }
  }, [reset]);

  const onClickFun = () => {
    let isChecked = checkBoxRef.current.children[name].checked;
    // console.log("text--", isChecked);
    if (!required && isChecked == false) {
      delete errors[name]; // Clear the error if isChecked is false
      setErrMsg([]);
    } else if (required && isChecked == false) {
      errors[name] = {
        message: errorMsg,
      };
      setErrMsg(errors[name]);
    } else {
      delete errors[name]; // Clear the error if isChecked is false
      setErrMsg([]);
    }
  };
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            required={required}
            label={label}
            control={
              <Checkbox
                {...field}
                checked={checked}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  setChecked(e.target.checked); // Update the checkbox state
                  onClickFun();
                }}
                ref={checkBoxRef}
                onClick={onClickFun}
                // defaultChecked={checked}
                disabled={disabled}
                color={color}
                sx={{ "& .MuiSvgIcon-root": { fontSize: `${size}px` } }}
              />
            }
          />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </>
  );
};

CheckboxFields.propTypes = {
  setValue: PropTypes.func,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  required: PropTypes.bool,
  errorMsg: PropTypes.string,
  checked: PropTypes.bool,
  size: PropTypes.number,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  reset: PropTypes.bool,
};

CheckboxFields.defaultProps = {
  setValue: undefined,
  required: false,
  errorMsg: undefined,
  checked: false,
  size: 29,
  label: "Agree",
  color: undefined,
  disabled: false,
  reset: false,
};

export default CheckboxFields;
