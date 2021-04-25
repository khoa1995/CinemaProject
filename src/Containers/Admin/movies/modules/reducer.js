import {
  GET_MOVIE_FAIL,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
  SEND_MOVIE_UPDATING_SUCCESS,
} from "./constants";

let initialState = {
  loading: false,
  movieList: [],
  err: null,
  movieNeedUpdate: {},
};

const movieListWithPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MOVIE_UPDATING_SUCCESS: {
      state.movieNeedUpdate = action.payload;
      return { ...state };
    }
    case GET_MOVIE_REQUEST: {
      state.loading = true;
      return { ...state };
    }
    case GET_MOVIE_SUCCESS: {
      state.loading = false;
      state.movieList = action.payload;
      return { ...state };
    }
    case GET_MOVIE_FAIL: {
      state.loading = false;
      state.err = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default movieListWithPaginationReducer;
