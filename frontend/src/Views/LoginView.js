import React, { useState, useContext } from "react";
import authContext from "../Context/Auth/authContext";
import alertContext from "../Context/Alert/alertContext";
import AuthLayout from "../Layouts/AuthLayout";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../Components/Spinner";

const LoginView = () => {
  const { loginUser, isAuth, userRole, loading } = useContext(authContext);
  const { alert } = useContext(alertContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      return console.error("Fields required");
    }
    loginUser(formData);
    console.log(formData);
  };
  if (isAuth && userRole === "user") {
    return <Redirect to="/dashboard" />;
  } else if (isAuth && userRole === "admin") {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <AuthLayout>
      <div className="login-form">
        {loading ? (
          <Spinner />
        ) : (
          <form className="login-form-inner" onSubmit={handleSubmit}>
            <h1>Login</h1>
            {alert && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}
            <div className="login-form-group">
              <label htmlFor="email">
                Email <span className="required-star">*</span>
              </label>
              <input
                type="text"
                placeholder="email@website.com"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="pwd">
                Password <span className="required-star">*</span>
              </label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                id="pwd"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="login-form-group single-row">
              <div className="custom-check"></div>

              <Link to="/forgot-password" className="link forgot-link">
                Forgot Password ?
              </Link>
            </div>

            <button type="submit" className="rounded-button login-cta">
              Login
            </button>

            <div className="register-div">
              Not registered yet?{" "}
              <Link to="/register" className="link create-account">
                Create an account ?
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default LoginView;
