import { SET_ALERT } from "../types";
const alertReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return payload;
    default:
      return state;
  }
};

export default alertReducer;
