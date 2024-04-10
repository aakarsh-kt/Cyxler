import React from "react";
import Activity from "./activity";
import { Button } from "antd";
export default function Sidebar() {
  const [enable, setEnable] = React.useState(false);
  return (
    <div>
      <h1>Sidebar</h1>
      <Button type="primary" onClick={() => setEnable(!enable)}>
        Add Event
      </Button>
      {enable && <Activity />}
    </div>
  );
}
