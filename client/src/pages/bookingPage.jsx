import React from "react";
import { TextField } from "@mui/material";
import { Button } from "antd";
import Navbar from "../components/NavBar.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function () {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loc = searchParams.get("loc");
  const owner = searchParams.get("owner");
  const user = searchParams.get("user");
  const navigate = useNavigate();
  function handleChat() {
    navigate(
      "/app/booking/chat?user=" + user + "&owner=" + owner + "&loc=" + loc
    );
  }

  return (
    <div>
      <Navbar />
      <div className="login--cont">
        <h2>Booking</h2>
        <div className="flex flex--gap">
          <h2>{owner}</h2>
          <h2>{loc}</h2>
          <TextField id="standard-basic" type="number" placeholder="Time(hr)" />
        </div>
        {/* <h3>Are You Sure?</h3> */}
        <div className="flex flex--gap">
          <Button type="primary">Pay</Button>
          <Button type="primary" onClick={handleChat}>
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
