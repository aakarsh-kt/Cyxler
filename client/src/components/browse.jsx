import React from "react";
import { Button } from "antd";
import { Outlet, Link } from "react-router-dom";
export default function (props) {
  return (
    <div>
      <h1>Browse Cycles</h1>
      {props.data.map((item, i) => {
        return (
          <div key={i} className="flex">
            <h3 className="standard--item">{item.from}</h3>
            <h3 className="standard--item">{item.owner}</h3>
            <Link
              to={`/app/booking?user=${props.user.email}&loc=${item.from}&owner=${item.owner}`}
              style={{ textDecoration: "none" }}
            >
              <Button type="primary" onClick={() => props.bookCycle(item)}>
                View
              </Button>
            </Link>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}
