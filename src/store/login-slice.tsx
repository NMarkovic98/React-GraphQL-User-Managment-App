import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JWT from 'jwt-decode';

interface LoginState {
  loggedIn: boolean;
  loginFormShowing: boolean;
  token: string;
  tokenValid: boolean;
}
const user = {
  username: 'nikola',
  password: '123',
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NDg3OTc5MjQsImV4cCI6MTY4MDMzMzkyNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.UdRGPjP1DyOARYm-lwcpEgksdSPUnBEMSdmoE6geBnw',
};
const initialState: LoginState = {
  loggedIn: false,
  loginFormShowing: false,
  token: '',
  tokenValid: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,

  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>,
    ) => {
      state.loggedIn = action.payload.username === user.username
      && action.payload.password === user.password;
      if (state.loggedIn) {
        state.token = user.token;
        localStorage.setItem('token', user.token);
      }
    },
    logout: (state) => {
      state.loggedIn = false;
      state.tokenValid = false;
      state.token = '';
      localStorage.removeItem('token');
    },
    showLoginForm: (state) => {
      state.loginFormShowing = true;
    },
    hideLoginForm: (state) => {
      state.loginFormShowing = false;
    },
    checkLoginStatus: (state) => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decodedToken: { exp: number } = JWT(storedToken);
        const currentDate = new Date();
        state.loggedIn = !(decodedToken.exp * 1000 < currentDate.getTime());
        state.tokenValid = !(decodedToken.exp * 1000 < currentDate.getTime());
        if (!state.tokenValid) {
          localStorage.removeItem('token');
        }
      } else {
        state.tokenValid = false;
        state.loggedIn = false;
      }
    },
  },
});

export const {
  login,
  logout,
  showLoginForm,
  hideLoginForm,
  checkLoginStatus,
} = loginSlice.actions;

export default loginSlice.reducer;
