import {
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_REQUEST,
  GET_MOVIE_DETAIL_FAIL,
} from "./constant";
import axios from "axios";
export const actGetMovieDetail = (id) => {
  return (dispatch) => {
    dispatch(actGetMovieDetailRequest());
    axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    })
      .then((res) => {
        // console.log(res.data);
        dispatch(actGetMovieDetailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actGetMovieDetailFail(err.message));
      });
  };
};

const actGetMovieDetailRequest = () => {
  return {
    type: GET_MOVIE_DETAIL_REQUEST,
  };
};
const actGetMovieDetailSuccess = (data) => {
  return {
    type: GET_MOVIE_DETAIL_SUCCESS,
    payload: data,
  };
};
const actGetMovieDetailFail = (err) => {
  return {
    type: GET_MOVIE_DETAIL_FAIL,
    payload: err,
  };
};
