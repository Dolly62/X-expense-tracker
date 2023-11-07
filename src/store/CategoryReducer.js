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
    deleteCategory(state, action) {
      const categoryToDel = state.categories.find(
        (delCategory) => delCategory.name === action.payload
      );
      if (categoryToDel) {
        state.categories = state.categories.filter(
          (categoryDeleted) => categoryDeleted.name !== action.payload
        );
      }
    },
    clearCategories(state) {
      state.categories = [];
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
