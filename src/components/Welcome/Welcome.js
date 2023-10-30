import React from "react";
import { Card } from "react-bootstrap";

const Welcome = () => {
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
    <Card.Body style={{ marginTop: "10%" }}>
      <Card.Title style={{ fontSize: "1.7rem", color: "purple" }} className="mb-5">
        {getCurrentTime()}, User!
      </Card.Title>
      <Card.Subtitle style={{ fontSize: "1.3rem" }} className="mb-4 text-muted">
        Welcome to ExpenseTrack: Your Smart Expense Management Solution!
      </Card.Subtitle>
      <Card.Text>
        Are you tired of the hassle of managing expenses? Say goodbye to
        spreadsheets and receipts piling up! ExpenseTrack is here to simplify
        your life and revolutionize the way you handle your finances.
      </Card.Text>
    </Card.Body>
  );
};

export default Welcome;
