import React from "react";
import Activity from "./activity";
import { Button } from "antd";
import { Link } from "react-router-dom";
export default function Sidebar(props) {

  function handleClick() {
    console.log("clicked");
    props.dis(); 
    setEn(!en);
  }
  const [en,setEn]=React.useState(false);
  // function 
  const [enable, setEnable] = React.useState(false);
  return (
    <div className="sidebar--mask">
      {/* <h1 style={{color:"Black"}}>Sidebar</h1> */}
      <Button type="primary" onClick={() => setEnable(!enable)}>
        Add Event
      </Button>
      {enable && <Activity addEvent={props.addEvent}/>}
      {/* <Link to="/cycles"> */}
      <Button type="primary" onClick={handleClick }>
       {!en?`Need a cycle?`:`Not Right now!`}
        </Button>

        {/* </Link> */}
    </div>
  );
}
