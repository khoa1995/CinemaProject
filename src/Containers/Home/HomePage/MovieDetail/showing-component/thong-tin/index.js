import React from "react";
import "./index.scss";
import dayjs from "dayjs";
export default function ThongTinComponent(props) {
  // console.log(props, "props ben thongtincopnt");
  let movie = props.movie;
  return (
    <div className="mainMaxWidth2">
      <div className="row">
        <div className="col-sm-6 col-xs-12 danhGia__left">
          <div className="row row__leftInfo">
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__title">Ngày công chiếu</p>
            </div>
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__content">
                {dayjs(`${movie.ngayKhoiChieu}`).format("DD.MM.YYYY")}
              </p>
            </div>
          </div>
          <div className="row row__leftInfo">
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__title">Đạo diễn</p>
            </div>
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__content">Patty Jenkins</p>
            </div>
          </div>
          <div className="row row__leftInfo">
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__title">Diễn viên</p>
            </div>
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__content">Chris Pine, Gal Gadot</p>
            </div>
          </div>
          <div className="row row__leftInfo">
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__title">Thể Loại</p>
            </div>
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__content">
                hành động, phiêu lưu, giả tưởng
              </p>
            </div>
          </div>
          <div className="row row__leftInfo">
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__title">Định dạng</p>
            </div>
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__content">2D/Digital</p>
            </div>
          </div>
          <div className="row row__leftInfo">
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__title">Quốc Gia SX</p>
            </div>
            <div className="col-sm-6 col-xs-12 left__content">
              <p className="danhGia__content">Mỹ</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xs-12 danhGia__right">
          <div>
            <p className="danhGia__title">Nội dung</p>
          </div>
          <div>
            <p className="danhGia__content">{movie.moTa}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
