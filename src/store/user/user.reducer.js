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
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, setError } = userSlice.actions;

export default userSlice.reducer;
