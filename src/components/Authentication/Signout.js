import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthReducer";
import { useHistory } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Signout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    history.replace("/signin");
  };
  return (
    <Button
      style={{ background: "none", border: "none" }}
      onClick={logoutHandler}
    >
      <RiLogoutCircleRLine title="Signout" style={{ fontSize: "1.2rem" }} />
    </Button>
  );
};

export default Signout;
