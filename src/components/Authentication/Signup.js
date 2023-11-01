import React, { useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CardComponent from "../../UI/Card";

const Signup = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmpassword, setEnteredConfirmPassword] = useState("");

  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(enteredEmail);
    setIsLoading(true);
    let url;
    if (enteredPassword === enteredConfirmpassword) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeQAn4MNp3AyuZaFns_Zrzu4apdac6DCY";
    } else {
      setErrorAlert("Passwords do not match");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        // localStorage.setItem("token", data.idToken);
        // localStorage.setItem("email", data.email);
        history.replace("/signin");
      } else {
        setAlert(true);
        const mapError = (errorCode) => {
          switch (errorCode) {
            case "EMAIL_EXISTS":
              return "This Email is already exists.";
            case "OPERATION_NOT_ALLOWED":
              return "You are not allowed to register new user."
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              return "Too many attempts. Try again later."
            default:
              return "Authentication failed!"
          }
        }
        setErrorAlert(mapError(data.error));
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }
    } catch (error) {
      
    } finally {
      setIsLoading(false);
      setEnteredEmail("");
      setEnteredPassword("");
      setEnteredConfirmPassword("");
    }
  };
  return (
    <CardComponent>
      <Card.Body>
        {alert && <Alert variant="danger">{errorAlert}</Alert>}
        <h2 style={{ marginBottom: "20px", color: "purple" }}>Welcome!</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email.ControlInput1">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password.ControlInput1">
            <Form.Control
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="confirmpassword.ControlInput1"
          >
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={enteredConfirmpassword}
              onChange={(e) => setEnteredConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            style={{ marginTop: "10px" }}
            variant="success"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
          <div className="mt-3">
            <button
              onClick={() => history.replace("/signin")}
              style={{ color: " rgb(255, 213, 0)" }}
            >
              Already have an account?
            </button>{" "}
          </div>
        </Form>
      </Card.Body>
    </CardComponent>
  );
};

export default Signup;
