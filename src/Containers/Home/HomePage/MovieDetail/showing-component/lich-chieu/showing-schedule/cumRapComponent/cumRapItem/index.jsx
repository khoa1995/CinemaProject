import React, { useState, useEffect } from "react";
import LichChieuComponent from "../lichChieuComponent";
import "./index.scss"
import { useSelector } from "react-redux";
export default function CumRapItem(props) {
  const item = props.item;
  const movie = props.movie;
  let ngayChieu = useSelector(
    (state) => state.showingShowDayReducer.currentDay
  );
  let heThongCumRap = useSelector(
    (state) => state.showingHTCRReducer.heThongCumRap
  );
  let [state, setState] = useState({ showHide: true });
  let showHide = state.showHide;
  const handleClickShowHide = () => {
    setState({ showHide: !state.showHide });
  };
  useEffect(() => {
    setState({ showHide: true });
  }, [ngayChieu]);
  let titleTheater = "";
  switch (item.thongTinRap.maHeThongRap) {
    case "BHDStar":
      titleTheater = "BHD Star";
      break;
    case "CGV":
      titleTheater = "CGV";
      break;
    case "CineStar":
      titleTheater = "CNS";
      break;
    case "MegaGS":
      titleTheater = "MegaGS";
      break;
    case "Galaxy":
      titleTheater = "GLX";
      break;
    case "LotteCinima":
      titleTheater = "Lotte";
      break;
    default:
      break;
  }

  //render TitleTheater
  let renderTitleTheater = () => {
    if (titleTheater && titleTheater.length > 0) {
      let infoTheater = item.thongTinRap.tenCumRap.substring(titleTheater.length);
      return <>
        <span className={`titleTheater ${item.thongTinRap.maHeThongRap}`}>{titleTheater}</span>
        {infoTheater}</>
    } else {
      return <span>{item.thongTinRap.tenCumRap}</span>
    }
  };

  // render AddressTheater
  let renderAddressTheater = () => {
    if (heThongCumRap && heThongCumRap.length > 0) {
      return heThongCumRap.map((item2, index) => {
        if (item2.maCumRap === item.thongTinRap.maCumRap) {
          return <span key={index} className="addressTheater">{item2.diaChi}</span>
        }
        else {
          return null;
        }
      })
    }
  }

  return (
    <li
      className="cumRap__item"
      style={{
        overflow: "hidden",
      }}
    >
      <div
        className="infoTheater"
        onClick={() => {
          handleClickShowHide();
        }}
      >
        {" "}
        <img
          src={`/img/imagesTheater/${item.thongTinRap.maCumRap}.jpg`}
          alt=""
          style={{ float: "left", height: "50px", width: "50px" }}
        />
        <h6
        >
          {renderTitleTheater()}
        </h6>
        <br />
        <span>{renderAddressTheater()}</span>
      </div>
      <div
        className="showHideRender"
        style={showHide ? { maxHeight: "500px" } : { maxHeight: "0" }}
      >
        <h6 className="typeOfMovie">2D Digital</h6>
        <div className="lichChieu" >
          <LichChieuComponent
            movie={movie}
            maHTR={item.thongTinRap.maCumRap}
            ngayChieu={ngayChieu}
          />
        </div>
      </div>
    </li>
  );;
}
