import React from "react";

const Todo = (props) => {
  return (
    <div
      className="todoContainer"
      onClick={() => {
        console.log(props);
        props.openEditTodo(props._id);
      }}
    >
      <div className="todoItem">
        <div className="todoHeading">
          <h3>{props.task}</h3>
        </div>

        <div className={`todoBtnContainer ${props.priority}`}>
          <div className="urgency">{`${props.priority[0].toUpperCase()}${props.priority.slice(
            1
          )}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
