import {
  GET_MOVIE_DETAIL_FAIL,
  GET_MOVIE_DETAIL_REQUEST,
  GET_MOVIE_DETAIL_SUCCESS,
} from "./constant";

let initialState = {
  movieDetail: null,
  loading: false,
  err: null,
  showing: "lichChieu",
};

const movieDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SHOWING":
      state.showing = action.payload;
      return { ...state };
    case GET_MOVIE_DETAIL_REQUEST:
      state.loading = true;
      return { ...state };
    case GET_MOVIE_DETAIL_SUCCESS:
      state.loading = false;
      state.movieDetail = action.payload;
      return { ...state };
    case GET_MOVIE_DETAIL_FAIL:
      state.loading = false;
      state.err = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default movieDetailReducer;
