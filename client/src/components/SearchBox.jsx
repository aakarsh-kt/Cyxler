import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "antd";
import { AutoComplete } from "antd";
import options from "./options";
export default function () {
  return (
    <div>
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
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          placeholder="Search for a location"
          className="auto"
        />

        <Button type="primary">Search</Button>
      </form>
    </div>
  );
}
