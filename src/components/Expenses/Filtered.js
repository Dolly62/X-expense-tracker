import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

const Filtered = (props) => {
  const categories = useSelector((state) => state.category.categories);

  const categorySelectHandler = (category) => {
    props.onCategorySelect(category);
  };

  return (
    <NavDropdown
      className="px-2 rounded-pill border-2 ml-2"
      title="Filter"
      id="basic-filter-dropdown"
    >
      <NavDropdown.Item
        onClick={() => categorySelectHandler(null)}
        active={props.selectedCategory === null}
      >
        All Categories
      </NavDropdown.Item>
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <NavDropdown.Item
            key={category.name}
            onClick={() => categorySelectHandler(category.enteredCategories)}
            active={props.selectedCategory === category.enteredCategories}
          >
            {category.enteredCategories}
          </NavDropdown.Item>
        ))
      ) : (
        <NavDropdown.Item>No Filter Item</NavDropdown.Item>
      )}
    </NavDropdown>
  );
};

export default Filtered;
