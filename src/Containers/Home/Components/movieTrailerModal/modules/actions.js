import { GET_MOVIE_TRAILER_SOURCE_SUCCESS } from "./constants";

export const actGetMovieTrailerSource = (data) => {
  return (dispatch) => {
    dispatch(actGetMovieTrailerSourceSuccess(data));
  };
};

const actGetMovieTrailerSourceSuccess = (data) => {
  return {
    type: GET_MOVIE_TRAILER_SOURCE_SUCCESS,
    payload: data,
  };
};
