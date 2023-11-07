import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    addCategories(state, action) {
      state.categories.push(action.payload);
    },
    replaceCategories(state, action) {
      state.categories = action.payload.category;
    },
    clearCategories(state) {
      state.categories = [];
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
