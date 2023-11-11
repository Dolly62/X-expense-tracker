import React, { useState } from "react";
import { Alert, Button, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/AuthReducer";
import CardComponent from "../../UI/Card";
import Password from "./Password";
import Heading from "../../UI/Heading";

const SignIn = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //ERROR
  const [errorAlert, setErrorAlert] = useState(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!enteredEmail || !enteredPassword) {
      return;
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeQAn4MNp3AyuZaFns_Zrzu4apdac6DCY",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", data.email);
          dispatch(
            authActions.login({
              token: localStorage.getItem("token"),
              email: localStorage.getItem("email"),
            })
          );
          history.replace("/home");
        } else {
          const mapError = (errorCode) => {
            switch (errorCode) {
              case "EMAIL_NOT_FOUND":
                return "There is no user record corresponding to this email .";
              case "INVALID_PASSWORD":
                return "The password is invalid.";
              case "USER_DISABLED":
                return "The user account has been disabled.";
              default:
                return "Authentication failed!";
            }
          };
          setErrorAlert(mapError(data.error));
          setTimeout(() => {
            setErrorAlert(null);
          }, 2000);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
        setEnteredEmail("");
        setEnteredPassword("");
      }
    }
  };
  return (
    <CardComponent>
      <Card.Body>
        {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
        <Heading>
          Welcome Back!
        </Heading>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email.ControlInput1">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password.ControlInput1">
            <Form.Control
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            className="mt-2"
            variant="success"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
          <div className="mt-3">
            <Password />
            <button
              onClick={() => history.replace("/signup")}
              className="text-yellow-400"
            >
              Don't have an account?
            </button>{" "}
          </div>
        </Form>
      </Card.Body>
    </CardComponent>
  );
};

export default SignIn;
