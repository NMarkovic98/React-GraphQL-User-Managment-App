import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { login } from "../store/login-slice";
import LoginForm from "../components/login/LoginForm";
import { client } from "../index";
import { MockedProvider } from "@apollo/client/testing";
describe("Login form should", () => {
  beforeAll(() => {
    const mocks: [] = [];
    render(
      <MockedProvider mocks={mocks}>
        <Provider store={store}>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );
  });
  it("show error messages when submitted with empty fields", async () => {
    store.dispatch(login({ username: "", password: "" }));
    const error = await screen.findAllByTestId("loginError");
    await waitFor(() => {
      expect(error.length).toBe(2);
    });
  });
  it("not show error messages when submitted with empty fields", async () => {
    store.dispatch(login({ username: "n", password: "1" }));
    const error = await screen.queryByTestId("loginError");
    await waitFor(() => {
      expect(error).toBeNull();
    });
  });
});
