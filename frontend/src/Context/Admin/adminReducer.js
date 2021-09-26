import {
  SET_ALL_USERS,
  SET_TODO_NUMBER,
  ADMIN_SET_USER,
  SET_TWILIO_STATS,
  SET_TODO_COUNT,
} from "../types";
const adminReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: payload,
      };
    case SET_TODO_NUMBER:
      return {
        ...state,
        numberOfTodos: payload,
      };
    case ADMIN_SET_USER:
      return {
        ...state,
        user: payload,
      };
    case SET_TWILIO_STATS:
      return {
        ...state,
        twilioStats: payload,
      };
    case SET_TODO_COUNT:
      return {
        ...state,
        todoCount: payload,
      };
    default:
      return state;
  }
};
export default adminReducer;
