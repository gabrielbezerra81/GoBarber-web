import React from "react";
import { Switch } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import Route from "./route";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Profile from "../pages/Profile/Profile";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
};

export default Routes;
