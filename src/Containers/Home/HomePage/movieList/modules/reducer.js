import {
  GET_MOVIES_FAIL,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_REQUEST,
} from "./constant";

let initialState = {
  movieList: [],
  err: "",
  loading: false,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      state.loading = true;
      return { ...state };
    case GET_MOVIES_SUCCESS:
      state.loading = false;
      state.movieList = action.payload;
      return { ...state };
    case GET_MOVIES_FAIL:
      state.loading = false;
      state.movieList = [];
      state.err = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default moviesReducer;
