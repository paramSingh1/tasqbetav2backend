import React, { useContext, useEffect } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import User from "../../Components/Admin/User";
import adminContext from "../../Context/Admin/adminContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { allUsers, getAllUsers } = useContext(adminContext);
  useEffect(() => {
    (async () => {
      await getAllUsers();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      <div className="containerHeader">
        <div className="pageTitle">
          <h3>All Users</h3>
        </div>
      </div>
      {allUsers.map((user) => {
        return (
          <Link
            to={`/admin/manageuser/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={user._id}
          >
            <User user={user} />
          </Link>
        );
      })}
    </AdminLayout>
  );
};

export default AdminDashboard;
