import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBoxField = ({ label = "freeSolo", options, onChange, onSelect }) => {
  return (
    <Stack spacing={2} sx={{ width: "100%", mb: "1rem" }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onChange={onChange}
        onSelect={onSelect}
        onInputChange={onChange}
        // disableClearable
        options={options.map((option) => option.label)}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      {/* <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        className="cursor-pointer"
        disableClearable
        options={options.map((option) => option.label)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            onChange={onChange}
            onSelect={onChange}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      /> */}
    </Stack>
  );
};

export default ComboBoxField;
