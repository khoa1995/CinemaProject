import {
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAIL,
  ADD_NEW_USER_FAIL,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_REQUEST,
  USER_NEED_UPDATE,
} from "./constant";

let initialState = {
  loading: false,
  data: null,
  err: null,
  user: null,
  userNeedUpdate: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      state.loading = true;
      return { ...state };
    case GET_USER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      return { ...state };
    case GET_USER_FAIL:
      state.loading = false;
      state.err = action.payload;
      return { ...state };

    case USER_NEED_UPDATE:
      state.userNeedUpdate = action.payload;
      return { ...state };

    case ADD_NEW_USER_REQUEST:
      state.loading = true;
      return { ...state };
    case ADD_NEW_USER_SUCCESS:
      state.loading = false;
      state.user = action.payload;
      return { ...state };
    case ADD_NEW_USER_FAIL:
      state.loading = false;
      state.err = action.payload;
      return { ...state };
    default:
      return state;
  }
};
export default userReducer;
