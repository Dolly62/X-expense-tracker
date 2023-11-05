import React, { useState } from "react";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import CardComponent from "../../UI/Card";

const Password = () => {
  const [show, setShow] = useState(false);
  const [emailForPassword, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const closeHandler = () => setShow(false);
  const showHandler = () => setShow(true);

  const passwordResetHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAeQAn4MNp3AyuZaFns_Zrzu4apdac6DCY",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailForPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsEmailSent(true);
      } else {
        throw new Error("Something went wrong! Please try again.");
      }
    } catch (error) {
      Alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="my-3" onClick={showHandler}>
        <button className="text-red-500">Forget Password</button>{" "}
      </div>

      <Modal show={show} onHide={closeHandler}>
        <CardComponent>
          <Card.Body>
            <h2 className="mb-3" style={{ color: "purple" }}>Reset Your Password</h2>
            {isEmailSent ? (
              <p>Mail Sent Successfully! Please check your email inbox.</p>
            ) : (
              <>
                <p>Enter the email with which you have registered:</p>
                <Form.Group className="mb-3" controlId="password.ControlInput1">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={emailForPassword}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="success" onClick={passwordResetHandler} disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send link"}
                </Button>
              </>
            )}
          </Card.Body>
        </CardComponent>
      </Modal>
    </>
  );
};

export default Password;
