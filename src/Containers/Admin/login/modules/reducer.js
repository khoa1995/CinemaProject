import {
  CHECK_LOGIN_FAIL,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_REQUEST,
} from "./constant";

let initialState = {
  loading: false,
  data: null,
  err: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_LOGIN_REQUEST:
      state.loading = true;
      return { ...state };
    case CHECK_LOGIN_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      return { ...state };
    case CHECK_LOGIN_FAIL:
      state.loading = false;
      state.err = action.payload;
      return { ...state };
    default:
      return state;
  }
};
export default loginReducer;
