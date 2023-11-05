import { Alert } from "react-bootstrap";
import { expenseActions } from "./ExpensesReducer";

export const fetchExpense = () => {
  return async (dispatch, getState) => {
    const email = getState().auth.email;
    const editEmail = email.replace(/[@.]/g, "");

    try {
      const response = await fetch(
        `https://x-expense43-default-rtdb.firebaseio.com/expenses/${editEmail}.json`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch expenses!");
      }
      if (data !== null) {
        const expenseArray = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        dispatch(expenseActions.replaceExpenses({ expense: expenseArray }));
      } else{
        return;
      }
    } catch (error) {
        Alert(error.message)
    }
  };
};
