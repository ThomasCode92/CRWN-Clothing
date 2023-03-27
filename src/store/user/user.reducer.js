import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    signUpStart(state, action) {
      state.isLoading = true;
    },
    emailSignInStart(state, action) {
      state.isLoading = true;
    },
    googleSignInStart(state, action) {
      state.isLoading = true;
    },
    signOutStart(state, action) {
      state.isLoading = true;
    },
    checkUserSession(state, action) {
      state.isLoading = true;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  signUpStart,
  emailSignInStart,
  googleSignInStart,
  signOutStart,
  checkUserSession,
  setCurrentUser,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
