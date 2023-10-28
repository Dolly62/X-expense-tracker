import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //ERROR 
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  const history = useHistory();

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
        } else{
          setAlert(true);
          const mapError = (errorCode) => {
            switch (errorCode) {
              case "EMAIL_NOT_FOUND":
                return "There is no user record corresponding to this email .";
              case "INVALID_PASSWORD":
                return "The password is invalid."
              case "USER_DISABLED":
                return "The user account has been disabled."
              default:
                return "Authentication failed!"
            }
          }
          setErrorAlert(mapError(data.error));
        }

      } catch (error) {

      }finally{
        setIsLoading(false);
        setEnteredEmail("");
        setEnteredPassword("");
      }
    }
  };
  return (
    <Card className="w-3/4 my-8 mx-auto">
      <Card.Body>
        {alert && <Alert variant="danger">{errorAlert}</Alert>}
        <h2 style={{ marginBottom: "20px" }}>Welcome Back!</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            style={{ marginTop: "10px" }}
            variant="success"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
          <div className="mt-3">
            <button
              onClick={() => history.replace("/signup")}
              style={{ color: " rgb(255, 213, 0)" }}
            >
              Don't have an account?
            </button>{" "}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignIn;
