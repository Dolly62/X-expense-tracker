import React, { useState } from "react";
import CardComponent from "../../UI/Card";
import { useSelector } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const EmailVer = () => {
  const [verficationSent, setVerficationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const token = useSelector((state) => state.auth.token);

  const history = useHistory();

  const emailVerificationHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAeQAn4MNp3AyuZaFns_Zrzu4apdac6DCY",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setVerficationSent(true);
      } else {
        const mapError = (errorMsg) => {
          switch (errorMsg) {
            case "INVALID_ID_TOKEN":
              return "Invalid user session. Please sign in again.";
            case "USER_NOT_FOUND":
              return "User not found.";
            default:
              return "Failed to send verification email. Please try again.";
          }
        };
        setErrorMsg(mapError(data.error));
        setTimeout(() => {
          setErrorMsg(null);
        }, 2000);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {errorMsg && (
        <Alert style={{ background: "none", border: "none", color: "red" }}>
          {errorMsg}
        </Alert>
      )}
      {verficationSent ? (<>
        <p className="text-green-500">
          Verfication Sent Successfully! Please check your inbox.
        </p>
        </>
      ) : (
        <button
          className="w-48 mx-auto mt-6"
          variant="success"
          onClick={emailVerificationHandler}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Verify Your Email"}
        </button>
      )}
    </>
  );
};

export default EmailVer;
