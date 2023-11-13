import React, { useCallback, useEffect, useState } from "react";
import CardComponent from "../../UI/Card";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EmailVer from "../Authentication/EmailVer";

const Profile = () => {
  const [enteredName, setEnteredName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const history = useHistory();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAeQAn4MNp3AyuZaFns_Zrzu4apdac6DCY",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: enteredName,
            photoUrl: profileUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Update");
      }
      // const data = await response.json();
      history.push("/home");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      setEnteredName("");
      setProfileUrl("");
    }
  };



  const updateProfileDataHandler = useCallback( async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAeQAn4MNp3AyuZaFns_Zrzu4apdac6DCY",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      // console.log(data);
      // console.log(data.providerUserInfo);
      if (data.providerUserInfo && data.providerUserInfo.length > 0) {
        const user = data.providerUserInfo[0];
        setEnteredName(user.displayName);
        setProfileUrl(user.photoUrl)
        // console.log(user.displayName);
      }
    } catch (error) {
     alert(error.message)
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      updateProfileDataHandler();
    }
  }, [isLoggedIn, updateProfileDataHandler]);

  return (<>
  <EmailVer/>
    <CardComponent>
      <Card.Body>
        {success && (
          <Alert style={{ background: "none", border: "none", color: "green" }}>
            Successfully Updated!
          </Alert>
        )}
        <h2 style={{ marginBottom: "20px", color: "purple" }}>Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullname.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password.ControlInput1">
            <Form.Control
              type="url"
              placeholder="https://example.com"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            style={{ marginTop: "10px" }}
            variant="success"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </Form>
      </Card.Body>
    </CardComponent>
    </>
  );
};

export default Profile;
