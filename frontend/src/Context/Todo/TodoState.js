import React, { useContext, useReducer } from "react";
import axios from "axios";
import todoContext from "./todoContext";
import todoReducer from "./todoReducer";
import authContext from "../Auth/authContext";
import alertContext from "../Alert/alertContext";

import { SET_ALL_TODOS } from "../types";

const TodoState = (props) => {
  const { setLoading } = useContext(authContext);
  const { setAlert } = useContext(alertContext);
  const initialState = { allTodos: [] };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const getAllTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/todos");
      dispatch({ type: SET_ALL_TODOS, payload: res.data.todos });
      setLoading(false);
    } catch (error) {
      setAlert(
        "danger",
        "We couldn't fetch your Todos at the moment , Please try reload the page "
      );
      setLoading(false);
    }
  };
  const addTodo = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/user/todos/add", payload);
      getAllTodos();
      setAlert("success", res.data.Success);
      setLoading(false);
    } catch (error) {
      let alertStr = "";
      if (error.response.data.errors) {
        alertStr = error.response.data.errors.reduce((acc, cur, index, arr) => {
          return `${acc} ${cur.msg}${
            index === arr.length - 1
              ? "."
              : index === arr.length - 2
              ? " and"
              : ","
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

  const updateTodo = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `/api/user/todos/edit/${payload._id}`,
        payload
      );
      getAllTodos();
      setAlert("success", res.data.Success);
      setLoading(false);
    } catch (error) {
      let alertStr = "";
      if (error.response.data.errors) {
        alertStr = error.response.data.errors.reduce((acc, cur, index, arr) => {
          return `${acc} ${cur.msg}${
            index === arr.length - 1
              ? "."
              : index === arr.length - 2
              ? " and"
              : ","
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
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/user/todos/delete/${id}`);
      getAllTodos();
      setAlert("success", res.data.Success);
      setLoading(false);
    } catch (error) {
      let alertStr = "";
      if (error.response.data.errors) {
        alertStr = error.response.data.errors.reduce((acc, cur, index, arr) => {
          return `${acc} ${cur.msg}${
            index === arr.length - 1
              ? "."
              : index === arr.length - 2
              ? " and"
              : ","
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

  return (
    <todoContext.Provider
      value={{ ...state, getAllTodos, addTodo, updateTodo, deleteTodo }}
    >
      {props.children}
    </todoContext.Provider>
  );
};

export default TodoState;
