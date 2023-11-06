import React from "react";
import CardComponent from "../../UI/Card";
import { useSelector } from "react-redux";
import { Card, Table } from "react-bootstrap";
import CustomCategoriesList from "./CustomCategoriesList";

const ExpensesList = () => {
  const expenses = useSelector((state) => state.expenses.items);

  const totalAmount = (expenses || []).reduce(
    (totalAmount, expense) => totalAmount + parseFloat(expense.spentPrice),
    0
  );

  return (
    <CardComponent>
      <CustomCategoriesList />
      <Card.Title>All Expenses</Card.Title>

      <CardComponent>
        <Card.Title>
          Total Amount: <span>Rs.{totalAmount.toFixed(2)}</span>
        </Card.Title>
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
