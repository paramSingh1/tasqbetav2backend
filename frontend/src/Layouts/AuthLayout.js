import React from "react";
import "../CSS/style.css";

const AuthLayout = (props) => {
  return (
    <div className="tasqLogin">
      <div className="login-container">{props.children}</div>
    </div>
  );
};

export default AuthLayout;
