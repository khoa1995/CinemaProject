import Axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  ADD_NEW_USER_FAIL,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  USER_NEED_UPDATE,
} from "./constant";

export const actGetAllUser = (keyword, currentPage, count) => {
  let url;
  if (keyword && keyword !== null) {
    url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${keyword}&soTrang=${currentPage}&soPhanTuTrenTrang=${count}`;
  } else {
    url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${currentPage}&soPhanTuTrenTrang=${count}`;
  }
  return (dispatch) => {
    dispatch(actGetAllUserRequest());
    Axios.get(url)
      .then((res) => {
        dispatch(actGetAllUserSuccess(res.data));
        // console.log(res.data);
      })
      .catch((err) => {
        dispatch(actGetAllUserFail(err.message));
      });
  };
};
const actGetAllUserRequest = () => {
  return {
    type: GET_USER_REQUEST,
  };
};
const actGetAllUserSuccess = (res) => {
  return {
    type: GET_USER_SUCCESS,
    payload: res,
  };
};
const actGetAllUserFail = (err) => {
  return {
    type: GET_USER_FAIL,
    payload: err,
  };
};

export const actAddNewUser = (user) => {
  return (dispatch) => {
    dispatch(actAddNewUserRequest());
    const accessToken = JSON.parse(localStorage.getItem("adminMember"))
      .accessToken;
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data: user,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        dispatch(actAddNewUserSuccess(res.data));
        Swal.fire({
          title: "Thêm Người Dùng Mới Thành Công!",
          icon: "success",
        }).then((res) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Thêm Người Dùng Mới thất bại!",
          icon: "error",
          text: `Tên tài khoản hoặc email này đã tồn tại!`,
        });
        dispatch(actAddNewUserFail(err.message));
      });
  };
};

const actAddNewUserRequest = () => {
  return {
    type: ADD_NEW_USER_REQUEST,
  };
};
const actAddNewUserSuccess = (data) => {
  return {
    type: ADD_NEW_USER_SUCCESS,
    payload: data,
  };
};
const actAddNewUserFail = (err) => {
  return {
    type: ADD_NEW_USER_FAIL,
    payload: err,
  };
};

export const actDeleteUser = (taiKhoan) => {
  return (dispatch) => {
    const accessToken = JSON.parse(localStorage.getItem("adminMember"))
      .accessToken;
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        Swal.fire({
          title: `Xóa tài khoản ${taiKhoan} thành công!`,
          icon: "success",
        }).then((res) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Xóa tài khoản thất bại!",
          text: `tài khoản ${taiKhoan} đã đặt vé, không thể xóa!`,
          icon: "info",
        }).then((res) => {
          window.location.reload();
        });
      });
  };
};

// export const actFindUserbyUserName = (user) => {
//   return (dispatch) => {
//     dispatch(actPushUserNeedUpdate(user));
//   };
// };
export const actPushUserNeedUpdate = (data) => {
  return {
    type: USER_NEED_UPDATE,
    payload: data,
  };
};

export const actUpdateUser = (user) => {
  const accessToken = JSON.parse(localStorage.getItem("adminMember"))
    .accessToken;
  return (dispatch) => {
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "PUT",
      data: user,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        Swal.fire({
          title: "Cập nhật tài khoản Thành Công!",
          icon: "success",
        }).then((res) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Cập nhật tài khoản thất bại!",
          text: `${err.message}`,
          icon: "error",
        }).then((res) => {
          window.location.reload();
        });
      });
  };
};
