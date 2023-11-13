import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import ExpensesReducer from "./ExpensesReducer";
import CategoryReducer from "./CategoryReducer";
import ThemeReducer from "./ThemeReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    expenses: ExpensesReducer,
    category: CategoryReducer,
    theme: ThemeReducer,
  },
});

export default store;
