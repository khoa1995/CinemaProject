import {
  GET_SCHEDULE_MOVIE_FAIL,
  GET_SCHEDULE_MOVIE_REQUEST,
  GET_SCHEDULE_MOVIE_SUCCESS,
} from "./constant";
let initialState = {
  loading: false,
  err: "",
  lichChieuTheoHTR: null, // chứa tất cả lịch chiếu theo .lstCumRap.danhSachPhim.lstLichChieuTheoPhim
  maCumRap: "bhd-star-cineplex-3-2",
};

const lichChieuPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MA_CUM_RAP":
      state.maCumRap = action.payload;
      return { ...state };
    case GET_SCHEDULE_MOVIE_REQUEST:
      state.loading = true;
      return { ...state };
    case GET_SCHEDULE_MOVIE_SUCCESS:
      state.loading = false;
      state.lichChieuTheoHTR = action.payload;
      return { ...state };
    case GET_SCHEDULE_MOVIE_FAIL:
      state.loading = false;
      state.err = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default lichChieuPhimReducer;
