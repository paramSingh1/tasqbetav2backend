import { SET_ALL_TODOS } from "../types";
const todoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALL_TODOS:
      return {
        ...state,
        allTodos: payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
