import { Button } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
export default function Result(props) {
  return (
    <div>
      {props.dat.map((item, i) => {
        return (
          <div key={i} className="flex flex--gap res">
            <h3 className="res--1">{item.from}</h3>
            <h3 className="res--2">{item.owner}</h3>
            <Link
              to={`/app/booking?user=${props.user.email}&loc=${item.from}&owner=${item.owner}`}
              style={{ textDecoration: "none" }}
            >
              <Button type="primary" onClick={() => props.bookCycle(item)}>
                Book
              </Button>
            </Link>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}
