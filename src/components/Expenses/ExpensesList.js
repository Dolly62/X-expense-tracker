import React from "react";
import CardComponent from "../../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Table } from "react-bootstrap";
import { useState } from "react";
import { TiDelete, TiEdit } from "react-icons/ti";
import { expenseActions } from "../../store/ExpensesReducer";
import { useHistory } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";

const ExpensesList = (props) => {
  const expenses = useSelector((state) => state.expenses.items);

  const email = useSelector((state) => state.auth.email);

  const [feedback, setFeedback] = useState(null);

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

  return (
    <CardComponent>
      <div className="d-flex mr-8 mt-3">
        <button
          title="Custom categories"
          className="ml-auto text-2xl"
          onClick={customCategoriesHandler}
        >
          <BiSolidCategory />
        </button>
      </div>
      <Card.Title>All Expenses</Card.Title>

      <CardComponent>
        <Card.Title>
          Total Amount: <span>Rs.{totalAmount.toFixed(2)}</span>
        </Card.Title>
        {feedback && (
          <Alert className="border-0 bg-transparent">
            {feedback.message}
          </Alert>
        )}
        <Table responsive>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {expenses && expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense.name} id={expense.id}>
                  <td>{expense.enteredDescription}</td>
                  <td>{expense.category}</td>
                  <td>Rs.{expense.spentPrice}</td>
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
