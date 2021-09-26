import React, { useContext } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import adminContext from "../../Context/Admin/adminContext";
import { useEffect } from "react/cjs/react.development";
import { useParams } from "react-router";
import authContext from "../../Context/Auth/authContext";
import Spinner from "../../Components/Spinner";
const UserView = (props) => {
  const { getUserTodos, getUserInfo, user, numberOfTodos, toggleUserStatus } =
    useContext(adminContext);
  const { loading } = useContext(authContext);
  let { id } = useParams();
  useEffect(() => {
    getUserInfo(id);
    getUserTodos(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      {loading ? (
        <Spinner />
      ) : (
        <div class="profile-form">
          <div class="profile-container">
            <label for="uname">
              <b>Username</b>
            </label>
            <input
              class="profile-input-username"
              type="text"
              value={user.username}
              disabled
            />
            <label for="uemail">
              <b>Email</b>
            </label>
            <input
              class="profile-input-email"
              type="text"
              value={user.email}
              disabled
            />
            <label for="uphone">
              <b>Phone</b>
            </label>
            <input class="profile-input-phone" value={user.phone} disabled />
            <label for="uphone">
              <b>Active Todos</b>
            </label>
            <input class="profile-input-phone" value={numberOfTodos} disabled />
            <label for="uphone">
              <b>Blocked ?</b>
            </label>
            <input class="profile-input-phone" value={user.locked} disabled />
          </div>

          <div class="profile-buttons-container">
            <button
              type="button"
              class="profile-cancel-btn"
              onClick={() => {
                toggleUserStatus(id);
              }}
            >
              {user.locked ? "Unblock User" : "Block User"}
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserView;
