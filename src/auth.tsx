import { ApolloError, ApolloLink } from "@apollo/client";
import JWT from "jwt-decode";

const authLink = new ApolloLink((operation, forward) => {
  let tokenIsValid;
  try {
    const storedToken = localStorage.getItem("token");
    // @ts-ignore
    const decodedToken = JWT(storedToken);
    const currentDate = new Date();
    // @ts-ignore
    tokenIsValid = !(decodedToken.exp * 1000 < currentDate.getTime());
  } catch (error) {}
  if (tokenIsValid) {
    // @ts-ignore
    operation.setContext(({ headers }) => ({
      headers: {
        authorization: localStorage.getItem("token"),
        ...headers,
      },
    }));
    return forward(operation);
  } else {
    throw new ApolloError({
      graphQLErrors: [],
      clientErrors: [],
      errorMessage: "Authentication Error",
    });
  }
});
export default authLink;
