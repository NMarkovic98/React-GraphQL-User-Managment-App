
import "./App.css";
import LoginPage from "./pages/login-page";
import { Redirect, Route, Switch } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLoginStatus } from "./store/login-slice";
import HomePage from "./pages/home-page";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import PageNotFound from "./components/UI/PageNotFound";
import ProfilePage from "./pages/profile-page";
import LaunchPage from "./pages/launch-page";
import MissionsPage from "./pages/missions-page";
import UsersPage from "./pages/users-page";
import AddUserPage from "./pages/add-user-page";


function App() {
  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);

  const tokenIsValid = useSelector(
    (state: RootState) => state.login.tokenValid
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus());
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/home" exact>
          {loggedIn && <HomePage />}
        </Route>
        <Route path="/login">
          {!tokenIsValid && <LoginPage />}
          {tokenIsValid && <HomePage />}
        </Route>
        <Route path="/launch">
          {!tokenIsValid && <LoginPage />}
          {tokenIsValid && <LaunchPage />}
        </Route>
        <Route path="/missions">
          {tokenIsValid && <MissionsPage />}
          {!tokenIsValid && <LoginPage />}
        </Route>
        <Route path="/users-overview" exact>
          {tokenIsValid && <UsersPage />}
          {!tokenIsValid && <LoginPage />}
        </Route>
        <Route path="/add-user">
          {tokenIsValid && <AddUserPage />}
          {!tokenIsValid && <LoginPage />}
        </Route>
        <Route path="/user/:userId" exact>
          {tokenIsValid && <ProfilePage />}
          {!tokenIsValid && <LoginPage />}
        </Route>

        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
