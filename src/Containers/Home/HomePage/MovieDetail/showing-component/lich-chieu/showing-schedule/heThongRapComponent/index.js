import React, { useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { actGetMovieSchedule } from "./modules/action";
export default function HeThongRapComponent(props) {
  let movie = props.movie;
  const dispatch = useDispatch();
  let hTR = useSelector((state) => state.showingHeThongRapReducer.data);
  useEffect(() => {
    dispatch(actGetMovieSchedule());
  });
  useEffect(() => {
    dispatch(actGetMovieSchedule());
  }, [dispatch, movie]);
  let maHTR = useSelector((state) => state.showingHeThongRapReducer.maHTR);
  // let [state, setState] = useState({ maHTR: "BHDStar" });
  const setMaHTR = (e) => {
    let action = { type: "set_maHTR", e };
    dispatch(action);
  };
  let renderHTR = () => {
    if (hTR && hTR.length > 0) {
      return hTR.map((item, index) => {
        return (
          <li
            className="list-group-item"
            key={index}
            onClick={() => {
              setMaHTR(item.maHeThongRap);
            }}
          >
            <img
              className="imgHover"
              src={item.logo}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                opacity: item.maHeThongRap === maHTR ? 1 : 0.55,
              }}
            />
          </li>
        );
      });
    }
  };
  // console.log("htr nè", hTR);
  return <ul>{renderHTR()}</ul>;
}
