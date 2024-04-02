import React from "react";
import { Button } from "antd";
import { Drawer } from "antd";
import {
  EditFilled,
  CloudFilled,
  FireFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
export default function (props) {
  const [open, setOpen] = React.useState(false);
  function handleDrawer() {
    setOpen(!open);
  }
  return (
    <div className="navbar--cont">
      {/* {console.log(props.user)} */}
      <nav>
        <ul className="navbar--list">
          <EditFilled className="icon" />
          <CloudFilled className="icon" />
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

            // key={placement}
          >
            <h2>{props.user?.username}</h2>
            <h2>{props.user?.email}</h2>

            {/* {console.log(props.user)} */}
            <Button type="primary" onClick={props.logout}>
              Sign Out
            </Button>
          </Drawer>
        </ul>
      </nav>
    </div>
  );
}
