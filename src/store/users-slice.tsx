import { createSlice } from '@reduxjs/toolkit';

interface UsersFormState {
  showing: boolean;
  currentlyStoredUser: {};
  showingNotification: boolean;
  addedUser: string;
  showingEditForm: boolean;
}

const initialState: UsersFormState = {
  showing: false,
  currentlyStoredUser: {},
  showingNotification: false,
  addedUser: '',
  showingEditForm: false,
};

export const formSlice = createSlice({
  name: 'userFrom',
  initialState,
  reducers: {
    showForm: (state) => {
      state.showing = true;
    },
    hideForm: (state) => {
      state.showing = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showForm, hideForm } = formSlice.actions;
export default formSlice.reducer;
