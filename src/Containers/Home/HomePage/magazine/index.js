import React, { useState } from "react";
import "./index.scss";
import KhuyenMaiComponent from "./component/khuyen-mai";
import DienAnhComponent from "./component/dien-anh";
import ReviewComponent from "./component/review";
export default function MagazineComponent(props) {
  const chonLoaiTin = (e) => {
    setState({
      loaiTinTuc: e,
    });
  };
  let [state, setState] = useState({ loaiTinTuc: "dienAnh" });
  const renderMagazine = () => {
    switch (state.loaiTinTuc) {
      case "dienAnh":
        return (
          <div className="col-12 magazine__detail fade-in">
            <DienAnhComponent />
          </div>
        );
      case "review":
        return (
          <div className="col-12 magazine__detail fade-in">
            <ReviewComponent />
          </div>
        );
      default:
        return (
          <div className="col-12 magazine__detail fade-in">
            <KhuyenMaiComponent />
          </div>
        );
    }
  };
  return (
    <div className="magazineTitle mainMaxWidth" id="idTinTuc">
      <div className="row">
        <div className="col-12 text-center wrapTitleMagazine">
          <button
            className={`${
              state.loaiTinTuc === "dienAnh"
                ? "btnActive mr-2 btnTitle"
                : "mr-2 btnTitle"
            }`}
            onClick={() => {
              chonLoaiTin("dienAnh");
            }}
          >
            Điện Ảnh 24h
          </button>
          <button
            className={`${
              state.loaiTinTuc === "review"
                ? "btnActive mr-2 btnTitle"
                : "mr-2 btnTitle"
            }`}
            onClick={() => {
              chonLoaiTin("review");
            }}
          >
            Review
          </button>
          <button
            className={`${
              state.loaiTinTuc === "khuyenMai"
                ? "btnActive  btnTitle"
                : " btnTitle"
            }`}
            onClick={() => {
              chonLoaiTin("khuyenMai");
            }}
          >
            Khuyến mãi
          </button>
        </div>
      </div>
      <div className="row magazineContent">
        {renderMagazine(state.loaiTinTuc)}
      </div>
    </div>
  );
}
