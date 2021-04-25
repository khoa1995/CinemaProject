import {
  GET_TICKET_ROOM_SUCCESS,
  GET_TICKET_ROOM_REQUEST,
  GET_TICKET_ROOM_FAIL,
  ACT_BOOKING_TICKET_SUCCESS,
} from "./constants";

let initialState = {
  loading: false,
  err: "",
  ticketRoom: null,
  ketQuaDatVe: null,
};

const ticketRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_ROOM_REQUEST:
      return { ...state, loading: true };
    case GET_TICKET_ROOM_SUCCESS:
      return { ...state, loading: false, ticketRoom: action.payload };
    case GET_TICKET_ROOM_FAIL:
      return { ...state, loading: false, err: action.payload };
    case ACT_BOOKING_TICKET_SUCCESS:
      return { ...state, ketQuaDatVe: action.payload };
    default:
      return state;
  }
};
export default ticketRoomReducer;
