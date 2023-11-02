import React from "react";
import { Card } from "react-bootstrap";

const CardComponent = (props) => {
  return (
    <Card
      style={{ background: "rgb(255, 236, 255)", border: "none" }}
      className="w-75 my-8 mx-auto"
    >
      {props.children}
    </Card>
  );
};

export default CardComponent;
