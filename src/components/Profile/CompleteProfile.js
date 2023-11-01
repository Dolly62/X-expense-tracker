import React, { useEffect, useState } from "react";
import { Alert, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CompleteProfile = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const profileHandler = () => {
    history.push("/profile");
  };

  const fetchProfileDataHandler = async () => {
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
        setSuccess(true);
      }
    } catch (error) {
      setError("Failed to fetch profile data.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfileDataHandler();
    }
  }, [isLoggedIn]);

  return (
    <div className="d-flex mr-8 mt-3">
      {error && <Alert variant="danger">{error}</Alert>}
      <h5
        title="Edit profile"
        className="ml-auto text-danger cursor-pointer"
        onClick={profileHandler}
      >
        {success ? <span style={{color: "green"}}>{userName}</span> : "Incomplete Profile"}
      </h5>
    </div>
  );
};

export default CompleteProfile;
