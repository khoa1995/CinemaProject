import {
  GET_SHOWDAY_REQUEST,
  GET_SHOWDAY_SUCCESS,
  GET_SHOWDAY_FAIL,
} from "./constant";
export const actFetchShowDay = (maHTR) => {
  return (dispatch) => {
    dispatch(actFetchShowDayRequest());
    //     Axios({
    //       url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHTR}`,
    //     })
    //       .then((res) => {
    //         dispatch(actGetHTCRSuccess(res.data));
    //       })
    //       .catch((err) => {
    //         dispatch(actGetHTCRFail(err.message));
    //       });
    dispatch(actFetchShowDaySuccess());
    dispatch(actFetchShowDayFail());
  };
};

const actFetchShowDayRequest = () => {
  return {
    type: GET_SHOWDAY_REQUEST,
  };
};
const actFetchShowDaySuccess = (data) => {
  return {
    type: GET_SHOWDAY_SUCCESS,
    payload: data,
  };
};
const actFetchShowDayFail = (message) => {
  return {
    type: GET_SHOWDAY_FAIL,
    payload: message,
  };
};
