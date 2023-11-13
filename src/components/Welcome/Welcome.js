import React, { Fragment } from "react";
import { Button, Card } from "react-bootstrap";
import CompleteProfile from "../Profile/CompleteProfile";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ThemeToggle from "../../UI/ThemeToggle";

const Welcome = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory()

  const getCurrentTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 20) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  return (
    <Fragment>
      <div className="d-flex justify-end ">
      {isLoggedIn && <CompleteProfile />}
      <ThemeToggle/>
      </div>
      <Card.Body className="mt-5">
        <Card.Title
          style={{ fontSize: "1.7rem", color: "purple", fontWeight: "bold" }}
          className="mb-5"
        >
          {getCurrentTime()}
        </Card.Title>
        <Card.Subtitle
          style={{ fontSize: "1.3rem" }}
          className="mb-4"
        >
          Welcome to ExpenseTrack: Your Smart Expense Management Solution!
        </Card.Subtitle>
        <Card.Text>
          Are you tired of the hassle of managing expenses? Say goodbye to
          spreadsheets and receipts piling up! ExpenseTrack is here to simplify
          your life and revolutionize the way you handle your finances.
        </Card.Text>
        {isLoggedIn && <Button variant="success" onClick={() => history.push("/expenses")}>Add Expenses</Button>}
      </Card.Body>
    </Fragment>
  );
};

export default Welcome;
