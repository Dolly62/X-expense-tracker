import React, { Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import Signout from "../Authentication/Signout";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Fragment>
      <Navbar className="mb-5" style={{ background: "purple" }} expand="sm">
        <Container>
          <Navbar.Brand
            href="/"
            style={{ fontSize: "1.6rem", fontWeight: "bolder", color: "white" }}
          >
            Xpense <span style={{ fontSize: "0.7rem" }}>Tracker</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className={classes.navbar}>
              <Nav.Item
                className="p-2 m-1 mx-2"
                style={{
                  fontSize: "1.2rem",
                  width: "6rem",
                }}
              >
                <NavLink to="/home" activeClassName={classes.active}>
                  Home
                </NavLink>
              </Nav.Item>
              {!isLoggedIn && (
                <Nav.Item
                  className="p-2 m-1 mx-2"
                  style={{
                    fontSize: "1.2rem",
                    width: "6rem",
                  }}
                >
                  <NavLink to="/login" activeClassName={classes.active}>
                    Login
                  </NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && <Signout />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
