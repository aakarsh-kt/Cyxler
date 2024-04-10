import React from "react";
import { Button } from "antd";
import {

  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase.js";
import { Link, Outlet } from "react-router-dom";
export default function () {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  
  async function login(event) {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        info.username,
        info.password
      );
      navigate("/app?user=" + user.user.email);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }
  const [info, setInfo] = React.useState({ username: "", password: "" });
  function handleChange(event) {
    const { name, value } = event.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  async function logout() {
    await signOut(auth);
  }
  return (
    <div className="login--cont">
      <h1>Login</h1>
      <form onSubmit={login} className="login--form">
        <label htmlFor="username">Username</label>
        <input
          className="standard-basic"
          type="text"
          id="username"
          name="username"
          required
          onChange={handleChange}
        ></input>
        <br />
        <label htmlFor="password">Password</label>
        <input
          className="standard-basic"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        ></input>
        <br />
        <button type="submit">Login</button>
        {user?.email}
      </form>
      <Link to="/register" style={{ textDecoration: "none" }}>
        Register
      </Link>
      <Button onClick={logout} type="primary">
        Logout
      </Button>

      <Outlet />
    </div>
  );
}
