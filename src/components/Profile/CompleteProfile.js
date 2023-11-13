import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CompleteProfile = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

  const profileHandler = () => {
    history.push("/profile");
  };

  const fetchProfileDataHandler = useCallback(async () => {
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
        setUserName(user.displayName);

        // console.log(user.displayName);
      }
    } catch (error) {
      setError("Failed to fetch profile data.");
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfileDataHandler();
    }
  }, [isLoggedIn, fetchProfileDataHandler]);

  // const firstLetter = userName.charAt(0);
  // console.log(firstLetter);

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <h5
        title="Edit profile"
        className="text-danger cursor-pointer"
        onClick={profileHandler}
      >
        {userName ? (
          <span
            className=" rounded-lg p-2 text-xl mr-6"
            style={{ color: "green" }}
          >
            Profile
          </span>
        ) : (
          "Incomplete Profile"
        )}
      </h5>
    </div>
  );
};

export default CompleteProfile;
