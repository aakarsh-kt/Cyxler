import React from "react";
import { TextField } from "@mui/material";
import { Button } from "antd";
import { AutoComplete } from "antd";
import { options } from "./options";
export default function (props) {
  const [input, setInput] = React.useState({ from: "", to: "" });
  function handleChange1(event) {
    // console.log(event.target);
    console.log(event);
    setInput((prev) => {
      return { ...prev, from: event };
    });
  }
  function handleChange2(event) {
    setInput((prev) => ({ ...prev, to: event }));
  }

  return (
    <div>
      <h1>Rent a Cycle</h1>
      <form
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <AutoComplete
          options={options}
          onChange={handleChange1}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          placeholder="Search for a location"
          className="auto"
          required
        />
        {/* <AutoComplete
          onChange={handleChange2}
          options={options}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          placeholder="Search for a location"
          className="auto"
        /> */}

        <Button type="primary" onClick={() => props.handleChange(input)}>
          Search
        </Button>
      </form>
    </div>
  );
}
