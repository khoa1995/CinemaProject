import Axios from "axios";
import {
  GET_USER_INFORMATION_FAIL,
  GET_USER_INFORMATION_REQUEST,
  GET_USER_INFORMATION_SUCCESS,
} from "./constants";

export const getUserInformation = (taiKhoan) => {
  return (dispatch) => {
    dispatch(getUserInformationRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      method: "POST",
      data: { taiKhoan: `${taiKhoan}` },
    })
      .then((res) => {
        dispatch(getUserInformationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getUserInformationFail(err.message));
      });
  };
};

const getUserInformationRequest = () => {
  return {
    type: GET_USER_INFORMATION_REQUEST,
  };
};

const getUserInformationFail = (data) => {
  return {
    type: GET_USER_INFORMATION_FAIL,
    payload: data,
  };
};

const getUserInformationSuccess = (data) => {
  return {
    type: GET_USER_INFORMATION_SUCCESS,
    payload: data,
  };
};
