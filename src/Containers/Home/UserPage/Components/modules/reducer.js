import {
  GET_USER_INFORMATION_SUCCESS,
  GET_USER_INFORMATION_FAIL,
  GET_USER_INFORMATION_REQUEST,
} from "./constants";

let initialState = {
  loading: false,
  err: "",
  userInfor: "",
};

const userInforReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFORMATION_REQUEST:
      return { ...state, loading: true };
    case GET_USER_INFORMATION_SUCCESS:
      return { ...state, loading: false, userInfor: action.payload };
    case GET_USER_INFORMATION_FAIL:
      return { ...state, loading: false, err: action.payload };
    default:
      return { ...state };
  }
};

export default userInforReducer;
