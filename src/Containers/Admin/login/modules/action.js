import {
  CHECK_LOGIN_FAIL,
  CHECK_LOGIN_REQUEST,
  CHECK_LOGIN_SUCCESS,
} from "./constant";
import Axios from "axios";
export const actLogin = (user, history) => {
  return (dispatch) => {
    dispatch(actCheckLoginRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user,
      method: "POST",
    })
      .then((res) => {
        if (res.data.maLoaiNguoiDung === "QuanTri") {
          localStorage.setItem("adminMember", JSON.stringify(res.data));
          dispatch(actCheckLoginSuccess(res.data));
          history.push("/admin/movies");
        } else {
          localStorage.setItem("userMember", JSON.stringify(res.data));
          history.push("");
          alert("Access denied!");
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(actCheckLoginFail(err.message));
      });
  };
};

const actCheckLoginRequest = () => {
  return {
    type: CHECK_LOGIN_REQUEST,
  };
};
const actCheckLoginSuccess = (data) => {
  return {
    type: CHECK_LOGIN_SUCCESS,
    payload: data,
  };
};
const actCheckLoginFail = (err) => {
  return {
    type: CHECK_LOGIN_FAIL,
    payload: err,
  };
};
