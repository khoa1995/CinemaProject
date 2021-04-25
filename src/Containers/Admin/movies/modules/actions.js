import Axios from "axios";
import {
  GET_MOVIE_FAIL,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_REQUEST,
  SEND_MOVIE_UPDATING_SUCCESS,
} from "./constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const actSendMovieUpdating = (data) => {
  return (dispatch) => {
    dispatch(actSendMovieUpdatingSuccess(data));
  };
};

const actSendMovieUpdatingSuccess = (data) => {
  return {
    type: SEND_MOVIE_UPDATING_SUCCESS,
    payload: data,
  };
};

export const actGetMovieWithPagination = (page) => {
  return (dispatch) => {
    dispatch(actGetMovieWithPaginationRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=5`,
    })
      .then((res) => {
        dispatch(actGetMovieWithPaginationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actGetMovieWithPaginationFail(err.message));
      });
  };
};

const actGetMovieWithPaginationRequest = () => {
  return {
    type: GET_MOVIE_REQUEST,
  };
};
const actGetMovieWithPaginationSuccess = (data) => {
  return {
    type: GET_MOVIE_SUCCESS,
    payload: data,
  };
};
const actGetMovieWithPaginationFail = (err) => {
  return {
    type: GET_MOVIE_FAIL,
    payload: err,
  };
};

export const actPostNewMovie = (movie) => {
  const accessToken = JSON.parse(localStorage.getItem("adminMember"))
    .accessToken;
  return (dispatch) => {
    // dispatch(actPostNewMovieRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      method: "POST",
      data: movie,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // dispatch(actPostNewMovieSuccess(res.data));
        Swal.fire({
          icon: "success",
          title: "Thêm phim mới thành công!",
        }).then((rs) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        // dispatch(actPostNewMovieFail(err.message));
        Swal.fire({
          icon: "error",
          title: "Thêm phim mới thất bại!",
          text: `${err.message}`,
        });
      });
  };
};
export const actUpdateMovie = (movie) => {
  const accessToken = JSON.parse(localStorage.getItem("adminMember"))
    .accessToken;
  return (dispatch) => {
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
      method: "POST",
      data: movie,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Cập nhật phim thành công!",
        }).then((rs) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Cập nhật phim thất bại!",
          text: `${err.message}`,
          timer: 5000,
        });
      });
  };
};
export const actUpdateMovieWithoutImage = (movie) => {
  const accessToken = JSON.parse(localStorage.getItem("adminMember"))
    .accessToken;
  return (dispatch) => {
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
      method: "POST",
      data: movie,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Cập nhật phim thành công!",
        }).then((rs) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Cập nhật phim thất bại!",
          text: `${err.message}`,
          timer: 5000,
        });
      });
  };
};

export const actDeleteMovie = (movieID) => {
  const accessToken = JSON.parse(localStorage.getItem("adminMember"))
    .accessToken;
  return (dispatch) => {
    //dispatchRequest
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${movieID}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // dispatch(actPostNewMovieSuccess(res.data));
        Swal.fire({
          icon: "success",
          title: "Xóa phim thành công!",
        }).then((res) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 500")
          Swal.fire({
            icon: "error",
            title: "Xóa phim thất bại!",
            text: "Phim đã xếp lịch chiếu, không thể xóa!",
          });
        else
          Swal.fire({
            icon: "success",
            title: "Xóa phim thành công!",
          }).then((res) => {
            window.location.reload();
          });
      });
  };
};
