import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../Context/Auth/authContext";

const AdminLayout = (props) => {
  const { signOut } = useContext(authContext);
  return (
    <div className="body">
      <div className="pageContainer">
        <div className="contentWrapper">
          <div className="topBar">
            <Link className="tasqLogo" to="/admin/dashboard">
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
              <Link className="sidebarLinks" to="/admin/dashboard">
                <div className="iconContainer">
                  <i className="fas fa-users-cog sidebarIcon"></i>
                  <p className="btnFunction">Manage Users</p>
                </div>
              </Link>

              <Link className="sidebarLinks" to="/admin/analytics">
                <div className="iconContainer">
                  <i className="fas fa-chart-pie sidebarIcon"></i>
                  <p className="btnFunction">Analytics</p>
                </div>
              </Link>
            </div>

            <div className="sideBar-mobile">
              <div className="iconContainer-mobile">
                <i className="fas fa-users-cog sidebarIcon"></i>
                <p className="btnFunction-mobile">Manage Users</p>
              </div>
              <div className="iconContainer-mobile">
                <i className="fas fa-chart-pie sidebarIcon"></i>
                <p className="btnFunction-mobile">Analytics</p>
              </div>
            </div>

            <div className="childContainer">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
