import React from "react";
import Activity from "./activity";
import { Button } from "antd";
export default function Sidebar(props) {
  const [enable, setEnable] = React.useState(false);
  return (
    <div className="sidebar--mask">
      {/* <h1 style={{color:"Black"}}>Sidebar</h1> */}
      <Button type="primary" onClick={() => setEnable(!enable)}>
        Add Event
      </Button>
      {enable && <Activity addEvent={props.addEvent}/>}
      
      <Button type="primary" >
        Need a cycle?
        </Button>
    </div>
  );
}
