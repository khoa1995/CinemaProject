import { GET_MOVIE_TRAILER_SOURCE_SUCCESS } from "./constants";

let initialState = {
  trailerURL: "",
};

const trailerMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_TRAILER_SOURCE_SUCCESS:
      return { ...state, trailerURL: action.payload };
    default:
      return state;
  }
};
export default trailerMovieReducer;
