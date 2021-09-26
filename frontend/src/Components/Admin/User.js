import React from "react";

const User = (props) => {
  return (
    <div>
      <div className="todoContainer">
        <div className="todoItem">
          <div className="todoHeading">
            <h3>
              {props.user.username} : {props.user.email}
            </h3>
          </div>
          <div className={`todoBtnContainer medium`}>
            <div className="urgency">Manage User</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
