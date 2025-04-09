import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Filter = () => {
  return (
    <div className="flex justify-end">
      <FormControl
        sx={{
          mb: 2,
          maxWidth: "300px",
          width: "100%",
        }}
      >
        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
          Category
        </InputLabel>
        <Select
          sx={{
            color: "white", // text color
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // border color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={"age"}
          label="Age"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Filter;
