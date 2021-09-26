import React, { useReducer, useContext } from "react";
import adminContext from "./adminContext";
import adminReducer from "./adminReducer";
import authContext from "../Auth/authContext";
import alertContext from "../Alert/alertContext";

import {
  ADMIN_SET_USER,
  SET_ALL_USERS,
  SET_TODO_NUMBER,
  SET_TWILIO_STATS,
  SET_TODO_COUNT,
} from "../types";
import axios from "axios";
const AdminState = (props) => {
  const { setAlert } = useContext(alertContext);
  const { setLoading } = useContext(authContext);
  const initialState = {
    allUsers: [],
    numberOfTodos: 0,
    user: {},
    twilioStats: null,
    todoCount: null,
  };
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/all");
      const { users } = res.data;
      dispatch({ type: SET_ALL_USERS, payload: users });
      setLoading(false);
    } catch (error) {
      setAlert(
        "danger",
        "We couldn't fetch All the at the moment , Please try reload the page "
      );
      setLoading(false);
    }
  };

  const getUserInfo = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/info/${id}`);
      dispatch({ type: ADMIN_SET_USER, payload: res.data });
      setLoading(false);
    } catch (error) {
      setAlert("danger", "We Could Not Fetch the user information");
      setLoading(false);
    }
  };

  const getUserTodos = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/todos/${id}`);
      dispatch({ type: SET_TODO_NUMBER, payload: res.data.todos });
      setLoading(false);
    } catch (error) {
      setAlert("danger", "The User Todo Information");
      setLoading(false);
    }
  };
  const toggleUserStatus = async (id) => {
    try {
      setLoading(true);
      await axios.put(`/api/admin/lock/${id}`);
      await getUserInfo(id);
      setLoading(false);
    } catch (error) {
      setAlert("danger", "Cannot Perform This Action At The Moment");
      setLoading(false);
    }
  };
  const getTwilioStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/twilioStats");
      dispatch({ type: SET_TWILIO_STATS, payload: res.data });
      setLoading(false);
    } catch (error) {
      setAlert("danger", "Cannot Fetch Sent SMS Information Right Now");
      setLoading(false);
    }
  };
  const getNotificationAnalytics = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin//todocount");
      dispatch({ type: SET_TODO_COUNT, payload: res.data });
      setLoading(false);
    } catch (error) {
      setAlert("danger", "Cannot Fetch Todo Count Information");
      setLoading(false);
    }
  };
  return (
    <adminContext.Provider
      value={{
        ...state,
        getAllUsers,
        getUserInfo,
        getUserTodos,
        toggleUserStatus,
        getTwilioStats,
        getNotificationAnalytics,
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminState;
