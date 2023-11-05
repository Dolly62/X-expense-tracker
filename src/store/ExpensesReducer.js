import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addExpenses(state, action) {
      state.items.push(action.payload);
      state.totalAmount += action.payload.spentPrice;
    },
    replaceExpenses(state, action) {
      state.items = action.payload.expense;
      state.totalAmount = action.payload.totalAmount;
    },
    clearExpensesState(state) {
      state.items = [];
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
