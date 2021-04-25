import React from "react";
import { Button } from "@material-ui/core";
import "./index.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useHistory } from "react-router";
export default function LichChieuComponent(props) {
  const dayjs = require("dayjs");
  let nowTime = dayjs().format("HH:mm");
  let nowDay = dayjs().format("YYYY/MM/DD");
  const history = useHistory();
  const lichChieu = props.movie.lichChieu;
  const currentDay = props.ngayChieu;
  const maHTR = props.maHTR;
  const handleOnClick = (item) => {
    const user = JSON.parse(localStorage.getItem("userMember"));
    if (user) {
      history.push({
        pathname: `/checkout/${item.maLichChieu}`,
        time: `${item.ngayChieuGioChieu}`,
      });
    } else {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Hãy đăng nhập trước khi đặt vé.",
      });
      setTimeout(() => {
        history.push({
          pathname: "/login",
          state: {
            scheduleId: `${item.maLichChieu}`,
            time: `${item.ngayChieuGioChieu}`,
          },
        });
      }, 500);
    }
  };
  let renderLichChieu = () => {
    let arrayRender = [];
    if (currentDay === nowDay) {
      lichChieu.map((item, index) => {
        let ngayChieu = dayjs(item.ngayChieuGioChieu).format("DD/MM/YYYY");

        if (
          item.thongTinRap.maCumRap === maHTR &&
          ngayChieu === dayjs(currentDay).format("DD/MM/YYYY")
        ) {
          arrayRender.push(
            <Button
              disabled={nowTime > dayjs(item.ngayChieuGioChieu).format("HH:mm")}
              key={item.maLichChieu}
              className="btn__datVe"
              onClick={() => {
                handleOnClick(item);
              }}
            >
              <span>
                <span
                  className={
                    nowTime > dayjs(item.ngayChieuGioChieu).format("HH:mm")
                      ? "timeDisabled"
                      : "timeStart"
                  }
                >
                  {" "}
                  {dayjs(item.ngayChieuGioChieu).format("HH:mm")} ~{" "}
                </span>
                <small>
                  {dayjs(item.ngayChieuGioChieu)
                    .add("2", "hour")
                    .format("HH:mm")}
                </small>
              </span>
            </Button>
          );
          return { ...arrayRender };
        }
        return { ...arrayRender };
      });
      return arrayRender;
    } else {
      lichChieu.map((item) => {
        let ngayChieu = dayjs(item.ngayChieuGioChieu).format("DD/MM/YYYY");
        if (
          item.thongTinRap.maCumRap === maHTR &&
          ngayChieu === dayjs(currentDay).format("DD/MM/YYYY")
        ) {
          arrayRender.push(
            <Button
              key={item.maLichChieu}
              className="btn__datVe"
              onClick={() => {
                handleOnClick(item);
              }}
            >
              <span>
                <span className="timeStart">
                  {" "}
                  {dayjs(item.ngayChieuGioChieu).format("HH:mm")} ~{" "}
                </span>
                <small>
                  {dayjs(item.ngayChieuGioChieu)
                    .add("2", "hour")
                    .format("HH:mm")}
                </small>
              </span>
            </Button>
          );
          return { ...arrayRender };
        }
        return { ...arrayRender };
      });
      return arrayRender;
    }
  };

  return (
    <div className="renderLichChieu" style={{}}>
      {renderLichChieu()}
    </div>
  );
}
