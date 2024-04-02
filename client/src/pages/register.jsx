import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import { Button } from "antd";
import { Users } from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
export default function () {
  const navigate = useNavigate();
  // const [success, setSuccess] = React.useState(false);

  async function register(event) {
    event.preventDefault();
    console.log("Reached here");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        info.email,
        info.password
      );

      console.log("eyyy");
      const userRef = doc(Users, info.email);
      await setDoc(userRef, {
        username: info.username,
        email: info.email,
        password: info.password,
      });
      navigate("/app?username=" + info.username);
      // navigate("/app");
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }
  const [info, setInfo] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="login--cont">
      <h1>Sign Up</h1>
      <form onSubmit={register} className="login--form">
        <label htmlFor="username">Username</label>
        <TextField
          type="text"
          id="username"
          name="username"
          required
          onChange={handleChange}
        ></TextField>
        <label htmlFor="email">Email</label>
        <TextField
          // className="stand rd-basic"
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
        ></TextField>
        {/* <br /> */}
        <label htmlFor="password">Password</label>
        <TextField
          // className="standard-basic"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        ></TextField>
        <br />
        <Button type="primary" onClick={register}>
          Register
        </Button>
      </form>
    </div>
  );
}
