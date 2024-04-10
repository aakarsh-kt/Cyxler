import React from "react";
import { Button } from "antd";
import { Drawer } from "antd";
import {
  MessageFilled,
  CloudFilled,
  FireFilled,
  UserOutlined,
  HomeFilled,
} from "@ant-design/icons";
import { getAuth } from "firebase/auth";
import { Avatar } from "antd";
import { Link, Outlet } from "react-router-dom";
export default function (props) {
  const [open, setOpen] = React.useState(false);
  function handleDrawer() {
    setOpen(!open);
  }

  const auth = getAuth();
  const UserCurr = auth.currentUser;
  
  function gotoHome() {
    window.location.href = "/app?user=" + UserCurr?.email;
  }
  return (
    <div className="navbar--cont">
      {/* {console.log(props.user)} */}
      <nav>
        <ul className="navbar--list">
          <HomeFilled className="icon" onClick={gotoHome} />
          <Link
            to="/inbox"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <MessageFilled className="icon" style={{ color: "black" }} />
          </Link>
          <FireFilled className="icon" />
          <Avatar
            icon={<UserOutlined className="icon" />}
            onClick={handleDrawer}
            style={{ cursor: "pointer" }}
          />
          <Drawer
            // title="Basic Drawer"
            placement={"right"}
            closable={true}
            onClose={handleDrawer}
            open={open}
          >
            <h2>{UserCurr?.username}</h2>
            <h2>{UserCurr?.email}</h2>
            <Button type="primary" onClick={props.logout}>
              Sign Out
            </Button>
          </Drawer>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
