import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import ExpensesReducer from "./ExpensesReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    expenses: ExpensesReducer
  },
});

export default store;
