import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/login-slice";

const Home = () => {
  const tokenIsValid = useSelector(
    (state: RootState) => state.login.tokenValid
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!tokenIsValid) {
      dispatch(logout());
    }
  }, [dispatch,tokenIsValid]);

  return <p>Home Page</p>;
};
export default Home;
