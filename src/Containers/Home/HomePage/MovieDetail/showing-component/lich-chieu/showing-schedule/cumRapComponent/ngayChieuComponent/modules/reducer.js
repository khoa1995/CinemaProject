import {
  GET_SHOWDAY_REQUEST,
  GET_SHOWDAY_SUCCESS,
  GET_SHOWDAY_FAIL,
} from "./constant";

let initialState = {
  listShowDay: [], //chứa các ngày chiếu
  currentDay: "",
  loading: false,
  err: null,
  maCumRap: "",
};

const showingShowDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "update_current_day":
      state.currentDay = action.e;
      return { ...state };
    case GET_SHOWDAY_REQUEST:
      state.loading = true;
      return { ...state };
    case GET_SHOWDAY_SUCCESS:
      state.loading = false;
      state.listShowDay = action.payload;
      return { ...state };
    case GET_SHOWDAY_FAIL:
      state.loading = false;
      state.err = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default showingShowDayReducer;
