import React from "react";
import CardComponent from "../../UI/Card";
import { useSelector } from "react-redux";
import { Card, Nav, Table } from "react-bootstrap";

const ExpensesList = () => {
  const expenses = useSelector((state) => state.expenses.items);

  const totalAmount = (expenses || []).reduce(
    (totalAmount, expense) => totalAmount + parseFloat(expense.spentPrice),
    0
  );

  return (
    <CardComponent>
        <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item><Nav.Link href="#first">All Expenses</Nav.Link></Nav.Item>
            </Nav>
        </Card.Header>
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
                  Rs.{expense.selectedDate}, {expense.selectedTime}
                </td>
              </tr>
            ))
          ) : (
            <Card.Header>No Expenses</Card.Header>
          )}
        </tbody>
      </Table>
      </CardComponent>
    </CardComponent>
  );
};

export default ExpensesList;
