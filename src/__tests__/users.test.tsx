import { screen, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import Users from '../components/users/Users';
import { store } from '../store/store';

import {
  getUserMock,
  graphQLErrorMock,
  loadingMock,
  networkErrorMock,
} from '../mocks/mocks';

describe('Users should', () => {
  test('Show loading state on page load', async () => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={loadingMock}>
          <ToastProvider placement="bottom-left">
            <BrowserRouter>
              <Users />
            </BrowserRouter>
          </ToastProvider>
        </MockedProvider>
      </Provider>
    );

    const circularProgress = await screen.findByRole('progressbar');

    await waitFor(() => {
      expect(circularProgress).toBeInTheDocument();
    });
  });
  test('Show username on good response', async () => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={[getUserMock]} addTypename={false}>
          <ToastProvider placement="bottom-left">
            <BrowserRouter>
              <Users />
            </BrowserRouter>
          </ToastProvider>
        </MockedProvider>
      </Provider>
    );

    const name = await screen.findByText('Nikola');
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(name).toBeInTheDocument();
  });

  it('should show network error UI', async () => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={[networkErrorMock]}>
          <ToastProvider placement="bottom-left">
            <BrowserRouter>
              <Users />
            </BrowserRouter>
          </ToastProvider>
        </MockedProvider>
      </Provider>
    );

    await new Promise((resolve) => setTimeout(resolve, 500)); // wait for response
    const errorMessage = await screen.findByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show graphql error UI', async () => {
    render(
      <Provider store={store}>
        <MockedProvider mocks={[graphQLErrorMock]}>
          <ToastProvider placement="bottom-left">
            <BrowserRouter>
              <Users />
            </BrowserRouter>
          </ToastProvider>
        </MockedProvider>
      </Provider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    const errorMessage = await screen.findByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();
  });
});
