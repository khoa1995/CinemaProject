import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function NgayChieuComponent(props) {
  const dayjs = require("dayjs");
  let nowDay = dayjs();
  // console.log("nowDay.format()", nowDay.format());
  const movie = props.movie;
  const dispatch = useDispatch();
  let currentDay = useSelector(
    (state) => state.showingShowDayReducer.currentDay
  );

  useEffect(() => {
    let itemDay = listDayTime[0];
    let action = { type: "update_current_day", e: itemDay };
    dispatch(action);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, movie]);

  const renderDayName = (i, minDate) => {
    if (i === 0) return "Hôm nay";
    else if (i === 1) return "Ngày Mai";
    else return `${dayjs(minDate).add(i, "day").format("DD/MM")}`;
  };

  //hàm update CurrentDay
  const handleUpdateCurrentDay = (e) => {
    let action = { type: "update_current_day", e };
    dispatch(action);
  };
  //xử lý ngày chiếu
  let listDayTime = [];
  let renderDayTime = () => {
    let checkIndexDayTime = (id) => {
      //hàm findIndex tìm vị trí
      return listDayTime.findIndex((item) => {
        return item === id;
      });
    };
    movie.lichChieu.forEach((item) => {
      let dayCheck = dayjs(item.ngayChieuGioChieu).format("YYYY/MM/DD");
      let ind = checkIndexDayTime(dayCheck);
      if (ind === -1) {
        listDayTime.push(dayCheck);
      }
    });
    const oneDay = 24 * 60 * 60 * 1000;
    let lstSortFirst = listDayTime.sort((a, b) => dayjs(a).diff(dayjs(b)));
    // console.log("lstSortFirst chưa cut nè: ", lstSortFirst);
    // console.log("nowDay nè: ", nowDay.format("YYYY/MM/DD"));
    let arrSorted = [];
    if (lstSortFirst && lstSortFirst.length > 0) {
      let amount = lstSortFirst.length;
      for (let i = 0; i < amount; i++) {
        if (lstSortFirst[0] >= nowDay.format("YYYY/MM/DD")) {
          // console.log("bằng nhau nè");
          // console.log("lstSortFirst[0] ", lstSortFirst[0]);
          // console.log("nowDay nè: ", nowDay.format("YYYY/MM/DD"));
          arrSorted = lstSortFirst;
          break;
        } else if (lstSortFirst[0] < nowDay.format("YYYY/MM/DD")) {
          // console.log(
          //   "i thứ: ",
          //   i,
          //   " lstSortFirst.length là:",
          //   lstSortFirst.length
          // );
          lstSortFirst.splice(0, 1);
        }
      }
      arrSorted = lstSortFirst;
      // console.log("arrSorted nè: ", arrSorted);
    }
    if (arrSorted && arrSorted.length > 0) {
      let lstLichChieuTheoPhimSorted = arrSorted;
      let minDate = new Date(
        lstLichChieuTheoPhimSorted.reduce(function (a, b) {
          return a < b ? a : b;
        })
      );
      let maxDate = new Date(
        lstLichChieuTheoPhimSorted.reduce(function (a, b) {
          return a > b ? a : b;
        })
      );
      const diffDays = Math.round(Math.abs((minDate - maxDate) / oneDay));
      let listRender = [];
      for (let i = 0; i <= diffDays + 5; i++) {
        listRender.push(
          <li className="dayTimeItem text-center" key={i}>
            {/* <p style={{ fontSize: "18px", fontWeight: "600" }}></p> */}
            <button
              disabled={i >= diffDays + 1}
              className={`btn__day ${
                dayjs(currentDay).format("DD/MM/YYYY") ===
                dayjs(minDate).add(i, "day").format("DD/MM/YYYY")
                  ? "btn__day__active"
                  : ""
              }`}
              onClick={() => {
                handleUpdateCurrentDay(
                  dayjs(minDate).add(i, "day").format("YYYY/MM/DD")
                );
              }}
            >
              {renderDayName(i, minDate)}
            </button>
          </li>
        );
      }
      // setShowDay({ listShowDayPhimSorted: listRender });
      listDayTime = lstLichChieuTheoPhimSorted;
      return listRender;
    } else {
      console.log("false nè");
      let listRender = [];
      for (let i = 0; i <= 7; i++) {
        listRender.push(
          <li className="dayTimeItem text-center" key={i}>
            {/* <p style={{ fontSize: "18px", fontWeight: "600" }}></p> */}
            <button disabled className="btn__day">
              {dayjs(nowDay).add(i, "day").format("DD/MM")}
            </button>
          </li>
        );
      }
      return listRender;
    }
  };
  return <>{renderDayTime()}</>;
}
