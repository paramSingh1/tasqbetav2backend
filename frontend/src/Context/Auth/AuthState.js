import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authreducer";
import alertContext from "../Alert/alertContext";
import setAuthToken from "../../utils/setAuthToken";

import {
  LOADING,
  LOGIN_SUCCESS,
  SET_USER,
  SIGN_OUT,
  SET_PROFILE,
} from "../types";

const AuthState = (props) => {
  useEffect(() => {
    (async () => {
      let token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        await loadUser(token);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { setAlert } = useContext(alertContext);
  const initialState = {
    user: null,
    loading: false,
    isAuth: false,
    userRole: null,
    token: "",
    profile: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setLoading = (loadingState) => {
    return dispatch({ type: LOADING, payload: loadingState });
  };

  const registerUser = async (formData) => {
    try {
      setLoading(true);
      let res = await axios.post("/api/user/register", {
        ...formData,
        role: "user",
      });
      setAlert("success", res.data.success);
      setLoading(false);
    } catch (error) {
      //   Show An Alert
      let alertStr = "";
      if (error.response.data.errors) {
        alertStr = error.response.data.errors.reduce((acc, cur, index, arr) => {
          return `${acc} ${cur.msg}${
            index === arr.length - 1
              ? "."
              : index === arr.length - 2
              ? " and "
              : "; "
          } ${""} `;
        }, "");
      }
      if (error.response.data.error) {
        alertStr = error.response.data.error;
      }
      setAlert("danger", alertStr);
      setLoading(false);
    }
  };

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/info");
      if (res.data.role === "admin") {
        res.data.verified = true;
      }
      dispatch({ type: SET_USER, payload: res.data });
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.error) {
        setAlert("danger", error.response.data.error);
      }
      setLoading(false);
      setAuthToken();
    }
  };

  const loginUser = async (formData) => {
    try {
      setLoading(true);
      let res = await axios.post("/api/login", formData);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.cyphertoken });
      setAuthToken(res.data.cyphertoken);
      loadUser();
      setLoading(false);
    } catch (error) {
      let alertStr = "";
      if (error.response.data.errors) {
        alertStr = error.response.data.errors.reduce((acc, cur, index, arr) => {
          return `${acc} ${cur.msg}${index === arr.length - 1 ? "." : ";"}`;
        }, "");
      }
      if (error.response.data.error) {
        alertStr = error.response.data.error;
      }
      setAlert("danger", alertStr);
      setLoading(false);
    }
  };
  const getUserProfile = async () => {
    try {
      setLoading(true);
      let res = await axios.get("/api/user/profile");
      const { userProfile } = res.data;
      dispatch({ type: SET_PROFILE, payload: userProfile });
      setLoading(false);
    } catch (error) {
      setAlert("danger", error.response.data.msg);
      setLoading(false);
    }
  };

  const addProfile = async (payload) => {
    try {
      setLoading(true);
      let res = await axios.post("/api/user/profile/add", payload);
      setAlert("success", "Profile Updated");
      dispatch({ type: SET_PROFILE, payload: res.data });
      setLoading(false);
    } catch (error) {
      setAlert("danger", error.response.data.msg);
      setLoading(false);
    }
  };

  const signOut = () => {
    setAuthToken();
    dispatch({ type: SIGN_OUT });
  };
  //   " password Must be Min 8 characters,Atleast 1 Uppercase, 1 Lowercase, 1 Number 1 Special Character ; password2 Must be Password & Confirm Password do not match, role Must be Invalid Role,"
  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        setLoading,
        signOut,
        getUserProfile,
        addProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
