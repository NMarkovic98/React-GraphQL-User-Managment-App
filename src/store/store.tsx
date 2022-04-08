import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login-slice';
import userFormReducer from './users-slice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    userForm: userFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
