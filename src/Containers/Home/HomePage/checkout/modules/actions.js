import Axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import {
  ACT_BOOKING_TICKET_SUCCESS,
  GET_TICKET_ROOM_FAIL,
  GET_TICKET_ROOM_REQUEST,
  GET_TICKET_ROOM_SUCCESS,
} from "./constants";

export const actGetTicketRoom = (scheduleId) => {
  return (dispatch) => {
    dispatch(actGetTicketRoomRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${scheduleId}`,
    })
      .then((res) => {
        // console.log(res.data);
        dispatch(actGetTicketRoomSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actGetTicketRoomFail());
      });
  };
};

const actGetTicketRoomRequest = () => {
  return {
    type: GET_TICKET_ROOM_REQUEST,
  };
};
const actGetTicketRoomSuccess = (data) => {
  return {
    type: GET_TICKET_ROOM_SUCCESS,
    payload: data,
  };
};
const actGetTicketRoomFail = (err) => {
  return {
    type: GET_TICKET_ROOM_FAIL,
    payload: err,
  };
};

export const actBookingTickets = (ticketInfor, ketQuaDatVe) => {
  const accessToken = JSON.parse(localStorage.getItem("userMember"))
    .accessToken;
  return (dispatch) => {
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      data: ticketInfor,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        dispatch(actBookingTicketSuccess(ketQuaDatVe));
        Swal.fire({
          icon: "success",
          title: "Đặt vé thành công!",
          // text: ".",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Đặt vé thất bại!",
          // text: ".",
        });
        console.log(err.message);
      });
  };
};

const actBookingTicketSuccess = (data) => {
  return {
    type: ACT_BOOKING_TICKET_SUCCESS,
    payload: data,
  };
};
