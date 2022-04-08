import { MockedResponse } from '@apollo/client/testing';
import { GET_USERS } from '../queries/queries';
import { GraphQLError } from 'graphql';

// Loading state
export const loadingMock: readonly MockedResponse[] | undefined = [];

// Get user
export const getUserMock = {
  request: {
    query: GET_USERS,
  },
  result: {
    data: {
      users: [
        {
          name: 'Nikola',
          rocket: 'Rocket1',
          id: 'ID',
        },
      ],
    },
  },
};

// Network error
export const networkErrorMock = {
  request: {
    query: GET_USERS,
  },
  error: new Error('An error occurred'),
};

//GraphQL error
export const graphQLErrorMock = {
  request: {
    query: GET_USERS,
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
};
