import React from "react";
import { TextField } from "@mui/material";
import { Button } from "antd";
import { AutoComplete } from "antd";
import { options } from "./options";
export default function (props) {
  const [dat, setDat] = React.useState({ from: "", owner: "" });
  function handleChange1(event) {
    setDat((prev) => ({ ...prev, from: event }));
  }
  function handleChange2(event) {
    setDat((prev) => ({ ...prev, owner: event.target.value }));
  }
  return (
    <div>
      <h1>Add Cycle</h1>
      <form>
        <AutoComplete
          className="auto"
          options={options}
          id="standard-basic"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          placeholder="Location"
          onChange={handleChange1}
        />
        <TextField
          id="standard-basic"
          placeholder="Owner"
          onChange={handleChange2}
        />

        <Button type="primary" onClick={() => props.addCycle(dat)}>
          Add
        </Button>
      </form>
    </div>
  );
}
