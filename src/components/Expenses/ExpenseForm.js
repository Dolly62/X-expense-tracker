import React, { useState } from "react";
import CardComponent from "../../UI/Card";
import { Alert, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../UI/Heading";
import { expenseActions } from "../../store/ExpensesReducer";
import ExpensesList from "./ExpensesList";

const ExpenseForm = () => {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [spentPrice, setSpentPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [show, setShow] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const closeHandler = () => setShow(false);
  const showHandler = () => setShow(true);

  const email = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();

  const addExpenseHandler = async (e) => {
    e.preventDefault();

    // console.log(enteredDescription);
    // console.log(spentPrice);
    // console.log(category);
    const emailId = email.replace(/[@.]/g, "");
    const expenseForm = {
      enteredDescription,
      spentPrice,
      category,
      selectedDate,
      selectedTime,
    };

    try {
      const response = await fetch(
        `https://x-expense43-default-rtdb.firebaseio.com/expenses/${emailId}.json`,
        {
          method: "POST",
          body: JSON.stringify(expenseForm),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setFeedback({ type: "success", message: "Added Successfully!" });
        dispatch(expenseActions.addExpenses({
          name: data.name,
          enteredDescription,
          spentPrice,
          category,
          selectedDate,
          selectedTime,
        }))
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to add" });
    } finally {
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
      setEnteredDescription("");
      setSpentPrice("");
      setCategory("");
      setSelectedDate("");
      setSelectedTime("");
    }
  };
  return (
    <>
      <Button onClick={showHandler} variant="success" className="mt-5">
        Add Expense
      </Button>

      <ExpensesList/>

      <Modal show={show} onHide={closeHandler}>
        <Modal.Header className="border-0" closeButton />
        <CardComponent>
          {feedback && (
            <Alert
              style={{ color: "green" }}
              className="border-0 bg-transparent"
              variant={feedback.type}
            >
              {feedback.message}
            </Alert>
          )}
          <Card.Body>
            <Heading>Add Your Expenses</Heading>
            <Form onSubmit={addExpenseHandler}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="text.ControlInput1">
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={enteredDescription}
                    onChange={(e) => setEnteredDescription(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="number.ControlInput1">
                  <Form.Control
                    type="number"
                    value={spentPrice}
                    placeholder="Price"
                    onChange={(e) => setSpentPrice(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="date.ControlInput1">
                  <Form.Control
                    type="date"
                    value={selectedDate}
                    placeholder="Price"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="time.ControlInput1">
                  <Form.Control
                    type="time"
                    value={selectedTime}
                    placeholder="Time"
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Form.Select
                name="Category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Default select example"
              >
                <option>Select category</option>
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="grocery">Grocery</option>
              </Form.Select>
              <Button type="submit" variant="success" className="mt-3">
                Add Expense
              </Button>
            </Form>
          </Card.Body>
        </CardComponent>
      </Modal>
    </>
  );
};

export default ExpenseForm;
