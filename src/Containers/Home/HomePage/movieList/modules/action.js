import {
  GET_MOVIES_FAIL,
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
} from "./constant";
import axios from "axios";

export const getMovies = () => {
  return (dispatch, setState) => {
    dispatch(actGetMoviesRequest());
    axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
    })
      .then((res) => {
        // console.log(res);
        dispatch(actGetMoviesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actGetMoviesFail(err));
      });
  };
};

const actGetMoviesRequest = () => {
  return {
    type: GET_MOVIES_REQUEST,
  };
};

const actGetMoviesSuccess = (data) => {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: data,
  };
};

const actGetMoviesFail = (err) => {
  return {
    type: GET_MOVIES_FAIL,
    payload: err.message,
  };
};
