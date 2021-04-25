import React from "react";
import "./index.scss";
import HeThongRapComponent from "./heThongRapComponent";
import CumRapComponent from "./cumRapComponent";
export default function ShowingMovieComponent(props) {
  let movie = props.movie;
  return (
    <div className="d-flex showing__main">
      <div className="showingHTR__content">
        <HeThongRapComponent />
      </div>
      <div className="showingCumRap__content">
        <CumRapComponent movie={movie} />
      </div>
    </div>
  );
}
