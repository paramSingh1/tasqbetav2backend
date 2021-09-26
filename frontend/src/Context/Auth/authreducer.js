import {
  LOADING,
  LOGIN_SUCCESS,
  SET_USER,
  SIGN_OUT,
  SET_PROFILE,
} from "../types";
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
      };
    case SET_USER:
      return {
        ...state,
        user: {
          username: payload.username,
          verified: payload.verified,
          email: payload.email,
          phone: payload.phone,
        },
        userRole: payload.role,
        isAuth: true,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case SIGN_OUT:
      return {
        user: null,
        loading: false,
        isAuth: false,
        userRole: null,
        token: "",
        profile: null,
      };
    default:
      return state;
  }
};

export default reducer;
