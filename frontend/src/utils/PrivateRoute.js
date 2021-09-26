import authContext from "../Context/Auth/authContext";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const { isAuth, loading } = useContext(authContext);
  return (
    <Route
      render={(props) =>
        !isAuth && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
