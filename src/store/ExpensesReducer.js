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
    deleteExpense(state, action) {
      const expenseToDel = state.items.find(
        (delExpense) => delExpense.name === action.payload
      );
      if (expenseToDel) {
        state.items = state.items.filter(
          (expenseDeleted) => expenseDeleted.name !== action.payload
        );
        state.totalAmount -= expenseToDel.spentPrice;
      }
    },
    updatedExpense(state, action) {
      const updatedExpenseIndex = state.items.findIndex(
        (expense) => expense.name === action.payload.name
      );
      if (updatedExpenseIndex !== -1) {
        state.items[updatedExpenseIndex] = action.payload;
        state.totalAmount += action.payload.spentPrice;
      }
    },
    clearExpensesState(state) {
      state.items = [];
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
