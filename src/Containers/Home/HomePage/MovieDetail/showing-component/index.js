import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DanhGiaComponent from "./danh-gia";
import "./index.scss";
import { CSSTransitionGroup } from "react-transition-group";
import LichChieuComponent from "./lich-chieu";
import ThongTinComponent from "./thong-tin";
export default function ShowingComponent(props) {
  // console.log(props, "props nè - showingComponent");
  let showing = useSelector((state) => state.movieDetailReducer.showing);
  const dispatch = useDispatch();
  let movie = props.movieDetail;
  const setShowing = (e) => {
    let action = { type: "UPDATE_SHOWING", payload: e };
    dispatch(action);
  };
  const renderShowing = () => {
    switch (showing) {
      case "lichChieu":
        return (
          <div className="showing_css" key={1}>
            <LichChieuComponent movie={movie} />
          </div>
        );
      case "thongTin":
        return (
          <div className="showing_css" key={2}>
            <ThongTinComponent movie={movie} />
          </div>
        );
      default:
        return (
          <div className="showing_css" key={3}>
            <DanhGiaComponent movie={movie} />
          </div>
        );
    }
  };
  return (
    <div id="showing__main" className="showing">
      <div className="showing__background">
        <div className="btnTitleMovie">
          <button
            className={`btnTitle mr-2 ${
              showing === "lichChieu" ? "btnActive" : ""
            }`}
            onClick={() => {
              setShowing("lichChieu");
            }}
          >
            Lịch Chiếu
          </button>
          <button
            className={`btnTitle mr-2 ${
              showing === "thongTin" ? "btnActive" : ""
            }`}
            onClick={() => {
              setShowing("thongTin");
            }}
          >
            Thông Tin
          </button>
          <button
            className={`btnTitle ${showing === "danhGia" ? "btnActive" : ""}`}
            onClick={() => {
              setShowing("danhGia");
            }}
          >
            Đánh giá
          </button>
        </div>
        <div className="showing__content">
          <div className="cssAnimation__content">
            <CSSTransitionGroup
              transitionName="showing_css"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={200}
            >
              {renderShowing(showing)}
            </CSSTransitionGroup>
          </div>
          {/* {renderShowing(showing)} */}
        </div>
      </div>
    </div>
  );
}
