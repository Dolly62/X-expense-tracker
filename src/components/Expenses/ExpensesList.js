import React from "react";
import CardComponent from "../../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Table } from "react-bootstrap";
import { useState } from "react";
import { TiDelete, TiEdit } from "react-icons/ti";
import { expenseActions } from "../../store/ExpensesReducer";
import { useHistory } from "react-router-dom";
import Filtered from "./Filtered";
import DownloadExpense from "./DownloadExpense";

const ExpensesList = (props) => {
  const expenses = useSelector((state) => state.expenses.items);

  const email = useSelector((state) => state.auth.email);

  const [feedback, setFeedback] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const customCategoriesHandler = () => {
    history.push("/customcategories");
  };

  const totalAmount = (expenses || []).reduce(
    (totalAmount, expense) => totalAmount + parseFloat(expense.spentPrice),
    0
  );

  const deleteExpenseHandler = async (name) => {
    const emailId = email.replace(/[@.]/g, "");
    try {
      const response = await fetch(
        `https://x-expense43-default-rtdb.firebaseio.com/expenses/${emailId}/Userexpenses/${name}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setFeedback({ type: "success", message: "Successfully Deleted!" });
        dispatch(expenseActions.deleteExpense(name));
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to delete" });
    } finally {
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  };

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <CardComponent>
      <div className="d-flex my-3">
        <DownloadExpense/>
        <button
          title="Custom categories"
          className="mr-4 bg-purple-400 rounded-3xl p-2 text-xs"
          onClick={customCategoriesHandler}
        >
          Categories
        </button>
      </div>

      <CardComponent>
        <div className="d-flex mb-3">
          <Card.Title>All Expenses</Card.Title>
          <Filtered
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>
        <Card.Title>
          Total Amount: <span>Rs.{totalAmount.toFixed(2)}</span>
        </Card.Title>
        {feedback && (
          <Alert className="border-0 bg-transparent">{feedback.message}</Alert>
        )}
        <Table responsive>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date/Time</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.name} id={expense.id}>
                  <td>{expense.enteredDescription}</td>
                  <td>{expense.category}</td>
                  <td style={{color: "red"}}>Rs.{expense.spentPrice}</td>
                  <td>
                    {expense.selectedDate}, {expense.selectedTime}
                  </td>
                  <td>
                    <TiDelete
                      title="delete"
                      className="text-xl text-red-600"
                      onClick={() => deleteExpenseHandler(expense.name)}
                    />

                    <TiEdit
                      title="edit"
                      className="text-xl text-yellow-300"
                      onClick={() => props.onEdit(expense)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Expenses</td>
              </tr>
            )}
          </tbody>
        </Table>
      </CardComponent>
    </CardComponent>
  );
};

export default ExpensesList;
