import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      style={{ backgroundColor: "#cfe5cf", height: "100vh", width: "100vw" }}
    >
      <div id="errcontainer">
        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x1_5"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>
        <div className="c">
          <div className="_404">404</div>
          <hr />
          <div className="_1">The Page</div>
          <div className="_2">Was Not Found</div>
          <Link className="errbtn" to="/login">
            Back To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
