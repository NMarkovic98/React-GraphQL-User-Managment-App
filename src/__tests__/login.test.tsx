import { screen, render, waitFor } from "@testing-library/react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Login from "../components/login/Login";
import { BrowserRouter } from "react-router-dom";
import PrimarySearchAppBar from "../components/layout/AppBar";
import { client } from "../index";

import React from "react";
import {
  hideLoginForm,
  login,
  logout,
  showLoginForm,
} from "../store/login-slice";
import { MockedProvider } from "@apollo/client/testing";

test("Should execute redux reducers well", async () => {
  let mocks: [] = [];
  render(
    <React.StrictMode>
      <Provider store={store}>
        <MockedProvider mocks={mocks}>
          <BrowserRouter>
            <PrimarySearchAppBar>
              <Login />
            </PrimarySearchAppBar>
          </BrowserRouter>
        </MockedProvider>
      </Provider>
    </React.StrictMode>
  );

  store.dispatch(showLoginForm());
  const username = screen.getByTestId("username").querySelector("input")!;
  expect(username).toBeInTheDocument();

  store.dispatch(hideLoginForm());
  expect(username).not.toBeInTheDocument();

  store.dispatch(login({ username: "nikola", password: "123" }));
  await waitFor(() => {
    const login = screen.queryByTestId("test1");
    expect(login).not.toBeInTheDocument();
  });

  store.dispatch(logout());
  await waitFor(() => {
    const login = screen.queryByTestId("test1");
    expect(login).toBeInTheDocument();
  });
});
