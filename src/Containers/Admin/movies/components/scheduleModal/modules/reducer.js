import {
  GET_ALL_HTR_SUCCESS,
  GET_ALL_HTR_REQUEST,
  GET_ALL_HTR_FAIL,
  GET_ALL_HTCR,
} from "./constants";

let initialState = {
  loading: false,
  err: "",
  heThongRap: null,
  heThongCumRap: [],
  cumRap: [],
};

const scheduleMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_HTR_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_HTR_SUCCESS:
      return { ...state, loading: false, heThongRap: action.payload };
    case GET_ALL_HTR_FAIL:
      return { ...state, loading: false, err: action.payload };
    case GET_ALL_HTCR:
      return { ...state, loading: false, heThongCumRap: action.payload };
    default:
      return { ...state };
  }
};
export default scheduleMovieReducer;
