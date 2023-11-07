import { Alert } from "react-bootstrap";
import { categoryActions } from "./CategoryReducer";

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    const email = getState().auth.email;
    const editEmail = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://x-expense43-default-rtdb.firebaseio.com/expenses/${editEmail}/categories.json`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch categories!");
      }
      if (data !== null) {
        const categoriesArray = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        dispatch(
          categoryActions.replaceCategories({ category: categoriesArray })
        );
      } else {
        return;
      }
    } catch (error) {
      Alert(error.message);
    }
  };
};
