import React from "react";
import CardComponent from "../../UI/Card";
import { Alert, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TiDelete, TiEdit } from "react-icons/ti";
import { useState } from "react";
import { categoryActions } from "../../store/CategoryReducer";

const CustomCategoriesList = () => {
  const [feedback, setFeedback] = useState();
  const categories = useSelector((state) => state.category.categories);
  const email = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();

  const deleteCategoryHandler = async (name) => {
    const emailId = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://x-expense43-default-rtdb.firebaseio.com/expenses/${emailId}/categories/${name}.json`,
        {
          method: "Delete",
        }
      );
      if (response.ok) {
        setFeedback({ type: "success", message: "Successfully Delete!" });
        dispatch(categoryActions.deleteCategory(name));
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to delete" });
    } finally {
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <CardComponent>
      <Card.Title className="mt-3">Custom Categories</Card.Title>
      {feedback && (
        <Alert className="border-0 bg-transparent">{feedback.message}</Alert>
      )}
      <CardComponent>
        <Table>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.name} id={category.id}>
                  <td>{category.enteredCategories}</td>
                  <td>
                    <TiDelete
                      title="delete"
                      className="text-xl text-red-600"
                      onClick={() => deleteCategoryHandler(category.name)}
                    />
                    <TiEdit title="edit" className="text-xl text-yellow-300" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Categories Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </CardComponent>
    </CardComponent>
  );
};

export default CustomCategoriesList;
