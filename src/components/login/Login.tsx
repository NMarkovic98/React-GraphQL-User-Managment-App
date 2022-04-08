import React, { Fragment } from "react";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Login: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
  const formShowing = useSelector(
    (state: RootState) => state.login.loginFormShowing
  );

  return <Fragment>{!loggedIn && formShowing && <LoginForm />}</Fragment>;
};

export default Login;
