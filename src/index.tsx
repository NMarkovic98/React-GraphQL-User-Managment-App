import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Provider } from "react-redux";
import PrimarySearchAppBar from "./components/layout/AppBar";
import { BrowserRouter } from "react-router-dom";
import authLink from "./auth";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

import { ToastProvider } from "react-toast-notifications";

const httpLink = new HttpLink({
  uri: "https://api.spacex.land/graphql/",
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PrimarySearchAppBar>
          <ToastProvider placement="bottom-left">
            <App />
          </ToastProvider>
        </PrimarySearchAppBar>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
