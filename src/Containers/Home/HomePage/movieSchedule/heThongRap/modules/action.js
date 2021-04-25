import { GET_HTR_FAIL, GET_HTR_REQUEST, GET_HTR_SUCCESS } from "./constant";
import axios from "axios";

export const actGetMovieSchedule = () => {
  return (dispatch) => {
    dispatch(actGetMovieScheduleRequest());
    axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        dispatch(actGetMovieScheduleSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actGetMovieScheduleFail(err.message));
      });
  };
};

const actGetMovieScheduleRequest = () => {
  return {
    type: GET_HTR_REQUEST,
  };
};
const actGetMovieScheduleSuccess = (data) => {
  return {
    type: GET_HTR_SUCCESS,
    payload: data,
  };
};
const actGetMovieScheduleFail = (message) => {
  return {
    type: GET_HTR_FAIL,
    payload: message,
  };
};
