import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddTodo from "../Components/Modal/AddTodo";
import authContext from "../Context/Auth/authContext";

const UserLayout = (props) => {
  const { signOut } = useContext(authContext);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const openAddTodo = () => {
    setShowAddTodo(true);
  };
  const closeAddTodo = () => {
    setShowAddTodo(false);
  };
  return (
    <div className="body">
      {showAddTodo && <AddTodo closeAddTodo={closeAddTodo} />}
      <div className="pageContainer">
        <div className="contentWrapper">
          <div className="topBar">
          <Link className="tasqLogo" to="/dashboard">
              <div className="logoContainer">
                <div className="logo">
                  <h2 className="logoLink">tasq</h2>
                </div>
              </div>
            </Link>
            <div className="searchBar">
              <div className="searchContainer">
                <input
                  className="searchInput"
                  type="text"
                  placeholder="Search tasq"
                />
                <div className="sunIcon" onClick={signOut}>
                  <i className="fas fa-sign-out-alt modeToggle"></i>
                </div>
                <div className="hamburger">
                  <i className="fas fa-bars hamburger"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="bodyContainer">
            <div className="sideBar">
              <div className="sidebarLinks" onClick={openAddTodo}>
                <div className="iconContainer">
                  <i className="fas fa-plus sidebarIcon"></i>
                  <p className="btnFunction">Add tasq</p>
                </div>
              </div>

              <Link className="sidebarLinks" to="/dashboard">
                <div className="iconContainer curr">
                  <i className="fas fa-tasks sidebarIcon"></i>
                  <p className="btnFunction">View All tasq</p>
                </div>
              </Link>

              <Link className="sidebarLinks" to="/profile">
                <div className="iconContainer">
                  <i className="fas fa-user sidebarIcon"></i>
                  <p className="btnFunction">Profile</p>
                </div>
              </Link>
            </div>

            <div className="sideBar-mobile">
              <div className="iconContainer-mobile curr">
                <i className="fas fa-plus sidebarIcon"></i>
                <p className="btnFunction-mobile">Add tasq</p>
              </div>
              <div className="iconContainer-mobile">
                <i className="fas fa-tasks sidebarIcon"></i>
                <p className="btnFunction-mobile">View All tasq</p>
              </div>
              <div className="iconContainer-mobile">
                <i className="fas fa-users-cog sidebarIcon"></i>
                <p className="btnFunction-mobile">Manage Users</p>
              </div>
              <div className="iconContainer-mobile">
                <i className="fas fa-chart-pie sidebarIcon"></i>
                <p className="btnFunction-mobile">Analytics</p>
              </div>
              <div className="iconContainer-mobile">
                <i className="fas fa-user sidebarIcon"></i>
                <p className="btnFunction-mobile">Profile</p>
              </div>
            </div>

            <div className="childContainer">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
