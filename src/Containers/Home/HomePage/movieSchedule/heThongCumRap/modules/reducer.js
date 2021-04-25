import { GET_HTCR_SUCCESS, GET_HTCR_REQUEST, GET_HTCR_FAIL } from "./constant";

let initialState = {
  heThongCumRap: [], // chứa tất cả danh sách rạp của tất cả cụm rạp trong 1 hệ thống .danhSachRap
  loading: false,
  err: null,
  maHTR: "BHDStar",
};

const hTCRReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MA_HTR":
      state.maHTR = action.payload;
      return { ...state };
    case GET_HTCR_REQUEST:
      state.loading = true;
      return { ...state };
    case GET_HTCR_SUCCESS:
      state.loading = false;
      state.heThongCumRap = action.payload;
      return { ...state };
    case GET_HTCR_FAIL:
      state.loading = false;
      state.err = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default hTCRReducer;
