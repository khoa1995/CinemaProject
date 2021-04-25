import {
  GET_SCHEDULE_MOVIE_FAIL,
  GET_SCHEDULE_MOVIE_REQUEST,
  GET_SCHEDULE_MOVIE_SUCCESS,
} from "./constant";
import Axios from "axios";

export const actGetScheduleMovie = (maHTR, maNhom) => {
  return (dispatch) => {
    dispatch(actGetScheduleMovieRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHTR}&maNhom=${maNhom}`,
    })
      .then((res) => {
        dispatch(actGetScheduleMovieSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actGetScheduleMovieFail(err.message));
      });
  };
};

const actGetScheduleMovieRequest = () => {
  return {
    type: GET_SCHEDULE_MOVIE_REQUEST,
  };
};
const actGetScheduleMovieSuccess = (data) => {
  return {
    type: GET_SCHEDULE_MOVIE_SUCCESS,
    payload: data,
  };
};
const actGetScheduleMovieFail = (message) => {
  return {
    type: GET_SCHEDULE_MOVIE_FAIL,
    payload: message,
  };
};
