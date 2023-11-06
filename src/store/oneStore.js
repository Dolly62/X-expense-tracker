import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import ExpensesReducer from "./ExpensesReducer";
import CategoryReducer from "./CategoryReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    expenses: ExpensesReducer,
    category: CategoryReducer,
  },
});

export default store;
