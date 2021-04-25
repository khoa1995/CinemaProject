import React from "react";
// Import react-circular-progressbar module and styles
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./index.scss";
export default function index(props) {
  let amount = props.movie.danhGia;
  return (
    <CircleComponent>
      <CircularProgressbar
        value={amount * 10}
        text={`${amount}`}
        styles={buildStyles({
          textColor: "white",
          pathColor: "#7ed321",
          trailColor: "#3a3a3a",
        })}
      />
    </CircleComponent>
  );
}
function CircleComponent(props) {
  return (
    <div className="circleComponent" style={{ marginBottom: 0 }}>
      <div style={{ marginTop: 0 }}>
        <div style={{ width: "100%", paddingRight: 0 }}>{props.children}</div>
        <div style={{ width: "100%" }}>
          <h3 className="h5">{props.label}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}
