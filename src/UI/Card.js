import React from "react";
import { Card } from "react-bootstrap";

const CardComponent = (props) => {
  return (
    <Card
      style={{ boxShadow: "3px 3px 20px 1px rgb(226, 188, 226)", border: "none" }}
      className="w-3/4 my-8 mx-auto"
    >
      {props.children}
    </Card>
  );
};

export default CardComponent;
