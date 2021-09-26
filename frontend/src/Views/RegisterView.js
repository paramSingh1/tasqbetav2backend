import React, { useState, useContext } from "react";
import authContext from "../Context/Auth/authContext";
import alertContext from "../Context/Alert/alertContext";
import AuthLayout from "../Layouts/AuthLayout";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../Components/Spinner";

const RegisterView = () => {
  const { registerUser, isAuth, userRole, loading } = useContext(authContext);
  const { alert } = useContext(alertContext);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    password2: "",
    tnc: false,
  });
  const handleChange = (e) => {
    if (e.target.name === "tnc") {
      return setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.username === "" ||
      formData.phone === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.password2 === ""
    ) {
      return console.error("Fields cannot be empty");
    }
    console.log(formData);
    registerUser(formData);
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
            <h1>Sign Up</h1>
            {alert && (
              <div class={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}
            <div className="login-form-group">
              <label htmlFor="text">
                Name <span className="required-star">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Enter name"
                id="name"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="text">
                Phone number <span className="required-star">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Phone number"
                id="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="email">
                Email <span className="required-star">*</span>
              </label>
              <input
                required
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
                required
                type="password"
                placeholder="Minimum 8 characters"
                id="pwd"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="pwd">
                Password <span className="required-star">*</span>
              </label>
              <input
                required
                type="password"
                placeholder="Confirm Password"
                id="confpwd"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
              />
            </div>

            <div className="login-form-group single-row">
              <div className="custom-check">
                <input
                  type="checkbox"
                  checked={formData.tnc}
                  id="remember"
                  name="tnc"
                  onChange={handleChange}
                />
                <label htmlFor="remember">Accept Terms & Conditions</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.tnc}
              className="rounded-button login-cta"
            >
              Sign Up
            </button>

            <div className="register-div">
              {" "}
              Already have an account?{" "}
              <Link to="/login" className="link create-account">
                Log in
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default RegisterView;
