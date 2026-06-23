import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { forwardRef } from "react";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiSelectField = forwardRef(
  ({ optionsList, label, name, required, placeholder, callBack }, ref) => {
    const [errMsg, setErrMsg] = useState(""); // Initialize error message with initial value from errors object
    const [value, setValue] = useState([]);
    // const [inputValue, setInputValue] = useState("");
    // console.log("value--", value);
    // console.log("inputValue--", inputValue);
    const onBlurFun = (e) => {
      //   let text = e.target.value.trim();
      let text = value.length;
      if (!required && text == 0) {
        setErrMsg("");
      } else if (required && text == 0) {
        setErrMsg(`${label} is required`);
      } else {
        setErrMsg("");
      }
    };
    return (
      <div className="mb-4">
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          value={value}
          // filterOptions={(options, params) => {
          //   // <<<--- inject the Select All option
          //   const filter = createFilterOptions();
          //   const filtered = filter(options, params);
          //   return [{ title: "Select All...", all: true }, ...filtered];
          // }}
          onBlur={onBlurFun}
          // onChange={(event, newValue) => { setValue(newValue); }} <<<--- OLD
          onChange={(event, newValue) => {
            if (newValue.find((option) => option.all))
              return setValue(
                value.length === optionsList.length ? [] : optionsList
              );

            callBack(newValue);
            setValue(newValue);
          }}
          options={optionsList}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                // checked={selected} <<<--- OLD
                checked={
                  option.all
                    ? !!(value.length === optionsList.length)
                    : selected
                }
              />
              {option.label}
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              inputRef={ref} // Pass the ref to the input field
              sx={{ height: "52px" }}
            />
          )}
        />
        {errMsg ? <ErrorMessage message={errMsg} /> : null}
      </div>
    );
  }
);

export default MultiSelectField;
