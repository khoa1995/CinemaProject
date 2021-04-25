import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { actGetHTCR } from "./modules/action";
import "./index.scss";
import NgayChieuComponent from "./ngayChieuComponent";
import CumRapItem from "./cumRapItem/index";
export default function CumRapComponent(props) {
  let movie = props.movie;
  const dispatch = useDispatch();
  // let heThongCumRap = useSelector(
  //   (state) => state.showingHTCRReducer.heThongCumRap
  // );
  let maHTR = useSelector((state) => state.showingHeThongRapReducer.maHTR);
  let ngayChieu = useSelector(
    (state) => state.showingShowDayReducer.currentDay
  );
  useEffect(() => {
    dispatch(actGetHTCR(maHTR));
  }, [dispatch, maHTR]);
  let listRapCoSuatChieu = [];
  if (movie && movie.lichChieu && movie.lichChieu.length > 0) {
    let checkAdult = (maCumRap) => {
      //hàm findIndex tìm vị trí
      return listRapCoSuatChieu.findIndex((item) => {
        return item.thongTinRap.maCumRap === maCumRap;
      });
    };
    movie.lichChieu.forEach((lichChieuItem) => {
      let maCumRap = lichChieuItem.thongTinRap.maCumRap;
      let maHeThongRap = lichChieuItem.thongTinRap.maHeThongRap;
      let ngayChieuItem = dayjs(lichChieuItem.ngayChieuGioChieu).format(
        "DD/MM/YYYY"
      );
      let ind = checkAdult(maCumRap);
      //lọc maHeThongRap , ngayChieu và push vào listRapCoSuatChieu
      if (
        ind === -1 &&
        maHeThongRap === maHTR &&
        ngayChieuItem === dayjs(ngayChieu).format("DD/MM/YYYY")
      ) {
        listRapCoSuatChieu.push(lichChieuItem);
      }
    });
  }

  let render = () => {
    if (listRapCoSuatChieu && listRapCoSuatChieu.length > 0) {
      return listRapCoSuatChieu.map((item, index) => {
        return <CumRapItem key={index} item={item} movie={movie} />;
      });
    } else {
      return (
        <div style={{ color: "black", fontSize: "1rem" }}>
          <p style={{ marginTop: "20px", textAlign: "center" }}>
            Không có suất chiếu
          </p>
        </div>
      );
    }
  };

  return (
    <ul className="listCumRap">
      <li className="listDayTime__content">
        <ul className="listDayTime">
          <NgayChieuComponent movie={movie} />
        </ul>
      </li>
      {render()}
    </ul>
  );
}
