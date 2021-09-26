import React from "react";
import Spin from "./Spinner.gif";
const Spinner = () => {
  let style = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={style}>
      <img src={Spin} alt="Loading" />
    </div>
  );
};

export default Spinner;
