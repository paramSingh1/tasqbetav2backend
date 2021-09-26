/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "../CSS/style.css";
import { UserLayout } from "../Layouts";
import authContext from "../Context/Auth/authContext";
import todoContext from "../Context/Todo/todoContext";
import alertContext from "../Context/Alert/alertContext";
import { Todo } from "../Components/Dashboard";
import Spinner from "../Components/Spinner";
import EditTodo from "../Components/Modal/EditTodo";

const DashboardView = () => {
  const {
    user: { username },
    loading,
  } = useContext(authContext);
  const { allTodos, getAllTodos } = useContext(todoContext);
  const { alert } = useContext(alertContext);
  useEffect(() => {
    (async () => {
      await getAllTodos();
    })();
  }, []);
  const [showEditTodo, setShowEditTodo] = useState(false);
  const openEditTodo = (id) => {
    setCurrentTodoId(id);
    setShowEditTodo(true);
  };
  const closeEditTodo = () => {
    setShowEditTodo(false);
  };
  const [currentTodoId, setCurrentTodoId] = useState(null);

  return (
    <UserLayout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {alert && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}
          <h2>Hi, {username} ☀️,</h2>
          <h3>
            Here Are Your Upcoming Tasq's. Let's have a productive day ! 💪
          </h3>
          {allTodos.map((ele) => (
            <Todo {...ele} key={ele._id} openEditTodo={openEditTodo} />
          ))}
        </>
      )}

      {showEditTodo && (
        <EditTodo closeEditTodo={closeEditTodo} todoId={currentTodoId} />
      )}
    </UserLayout>
  );
};
/*
  

*/

export default DashboardView;
