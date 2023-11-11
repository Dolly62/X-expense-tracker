import React, { Fragment } from "react";
import { useState } from "react";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import CardComponent from "../../UI/Card";
import Heading from "../../UI/Heading";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../store/CategoryReducer";

const CustomCategories = () => {
  const [enteredCategories, setEnteredCategories] = useState("");
  const [show, setShow] = useState(false);

  const categories = useSelector((state) => state.category.categories);

  const showHandler = () => setShow(true);
  const closeHandler = () => setShow(false);

  const [feedback, setFeedback] = useState(null);

  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);

  const addCustomCategories = async (e) => {
    e.preventDefault();

    const emailId = email.replace(/[@.]/g, "");
    const isCategoryExists = categories.some(
      (category) => category.enteredCategories === enteredCategories
    );
    if (isCategoryExists) {
      setFeedback({ type: "error", message: "Category already exists!" });
      setTimeout(() => setFeedback(null), 2000);
    } else {
      try {
        const response = await fetch(
          `https://x-expense43-default-rtdb.firebaseio.com/expenses/${emailId}/categories.json`,
          {
            method: "POST",
            body: JSON.stringify({
              enteredCategories,
            }),
          }
        );
        const data = await response.json();
        //   console.log(data);
        if (response.ok) {
          setFeedback({ type: "success", message: "Added Successfully" });
          dispatch(
            categoryActions.addCategories({
              name: data.name,
              enteredCategories,
            })
          );
        }
      } catch (error) {
        setFeedback({ type: "error", message: "Failed to add" });
      } finally {
        setTimeout(() => setFeedback(null), 2000);
        setEnteredCategories("");
        closeHandler();
      }
    }
  };
  return (
    <Fragment>
        {feedback && (
          <Alert variant={feedback.type} className="border-0 bg-transparent">
            {feedback.message}
          </Alert>
        )}
      <Button className="ml-5" onClick={showHandler}>
        Add Custom Categories
      </Button>

      <Modal show={show} onHide={closeHandler} className="text-center">
        <Modal.Header className="border-0" closeButton />
        <CardComponent>
          <Card.Body>
            <Heading>Add Custom Categories</Heading>
            <Form onSubmit={addCustomCategories}>
              <Form.Group controlId="text.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Custom Category"
                  value={enteredCategories}
                  onChange={(e) => setEnteredCategories(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="success" className="mt-3">
                Add Expense
              </Button>
            </Form>
          </Card.Body>
        </CardComponent>
      </Modal>
    </Fragment>
  );
};

export default CustomCategories;
