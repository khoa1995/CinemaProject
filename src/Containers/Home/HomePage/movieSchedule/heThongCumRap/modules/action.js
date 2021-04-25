import { GET_HTCR_FAIL, GET_HTCR_REQUEST, GET_HTCR_SUCCESS } from "./constant";
import Axios from "axios";
export const actGetHTCR = (maHTR) => {
  return (dispatch) => {
    dispatch(actGetHTCRRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHTR}`,
    })
      .then((res) => {
        dispatch(actGetHTCRSuccess(res.data));
      })
      .catch((err) => {
        dispatch(actGetHTCRFail(err.message));
      });
  };
};

const actGetHTCRRequest = () => {
  return {
    type: GET_HTCR_REQUEST,
  };
};
const actGetHTCRSuccess = (data) => {
  return {
    type: GET_HTCR_SUCCESS,
    payload: data,
  };
};
const actGetHTCRFail = (message) => {
  return {
    type: GET_HTCR_FAIL,
    payload: message,
  };
};
