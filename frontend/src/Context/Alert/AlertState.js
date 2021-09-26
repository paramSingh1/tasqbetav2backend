import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT } from "../types";
const AlertState = (props) => {
  const intialState = null;
  const [state, dispatch] = useReducer(alertReducer, intialState);
  const setAlert = (type, message) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        type,
        message,
      },
    });
    setTimeout(() => {
      dispatch({
        type: SET_ALERT,
        payload: null,
      });
    }, 10000);
  };
  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
