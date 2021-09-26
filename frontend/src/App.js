import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Error,
  RegisterView,
  LoginView,
  DashboardView,
  ProfileView,
} from "./Views";
import { AuthState, AlertState, TodoState, AdminState } from "./Context";
import PrivateRoute from "./utils/PrivateRoute";
import { AdminDashboard, User } from "./Views/Admin";
import Analytics from "./Views/Admin/Analytics";

let App = () => {
  return (
    <AlertState>
      <AuthState>
        <AdminState>
          <TodoState>
            <div className="App">
              <Switch>
                <Route exact path="/login">
                  <LoginView />
                </Route>
                <Route exact path="/register">
                  <RegisterView />
                </Route>
                <Route exact path="/dashboard">
                  <PrivateRoute component={DashboardView} />
                </Route>
                <Route exact path="/profile">
                  <PrivateRoute component={ProfileView} />
                </Route>
                <Route exact path="/admin/dashboard">
                  <PrivateRoute component={AdminDashboard} />
                </Route>
                <Route exact path="/admin/manageuser/:id">
                  <PrivateRoute component={(props) => <User {...props} />} />
                </Route>
                <Route path="/admin/analytics">
                  <PrivateRoute component={Analytics} />
                </Route>
                <Route>
                  <Error />
                </Route>
              </Switch>
            </div>
          </TodoState>
        </AdminState>
      </AuthState>
    </AlertState>
  );
};

export default App;
