import Axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const actUpdateInfor = (data, changePassword) => {
  const accessToken = JSON.parse(localStorage.getItem("userMember"))
    .accessToken;
  return (dispatch) => {
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!changePassword) {
          let cloneData = {
            ...res.data,
            accessToken: accessToken,
            maLoaiNguoiDung: "KhachHang",
          };
          delete cloneData.matKhau;
          delete cloneData.thongTinDatVe;
          delete cloneData.loaiNguoiDung;
          localStorage.setItem("userMember", JSON.stringify(cloneData));
        }
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
        }).then((rs) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Cập nhật thất bại",
          text: "email đã tồn tại, không thể thay đổi!",
        });
      });
  };
};

// const actUpdateInforRequest = () => {
//   return {
//     type: ACT_UPDATE_INFOR_REQUEST,
//   };
// };

// const actUpdateInforSuccess = (data) => {
//   return {
//     type: ACT_UPDATE_INFOR_SUCCESS,
//     payload: data,
//   };
// };

// const actUpdateInforFail = (data) => {
//   return {
//     type: ACT_UPDATE_INFOR_FAIL,
//     payload: data,
//   };
// };
