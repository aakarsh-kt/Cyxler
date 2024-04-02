import React from "react";

export default function Result(props) {
  return (
    <div>
      {props.dat.map((item,i) => {
        return (
          <div key={i}>
            <h1>{item.from}</h1>
          </div>
        );
      })}
    </div>
  );
}