import React, { useState } from "react";
import CardComponent from "../../UI/Card";
import { Card, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BiSolidCategory } from "react-icons/bi";

const CustomCategoriesList = () => {
  const categories = useSelector((state) => state.category.categories);

  const [show, setShow] = useState();

  const showHandler = () => setShow(true);
  const closeHandler = () => setShow(false);

  return (
    <div className="d-flex mr-8 mt-3">
      <button
        title="custom categories"
        className="ml-auto text-2xl"
        onClick={showHandler}
      >
        <BiSolidCategory />
      </button>
      <Modal show={show} onHide={closeHandler}>
        <Modal.Header className="border-0" closeButton />
        <CardComponent>
          <Card.Title>Custom Categories</Card.Title>
          <Table>
            <tbody>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.name} id={category.id}>
                    <td>{category.enteredCategories}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Categories</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardComponent>
      </Modal>
    </div>
  );
};

export default CustomCategoriesList;
