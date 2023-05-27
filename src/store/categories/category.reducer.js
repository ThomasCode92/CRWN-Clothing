import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'category',
  initialState: INITIAL_STATE,
  reducers: {
    fetchCategoriesStart(state, action) {
      state.isLoading = true;
    },
    setCategories(state, action) {
      state.categories = action.payload;
      state.isLoading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchCategoriesStart, setCategories, setError } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
