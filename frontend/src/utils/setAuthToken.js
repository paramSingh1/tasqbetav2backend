import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["tasq-auth-token"] = token;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["tasq-auth-token"];
  }
};

export default setAuthToken;
