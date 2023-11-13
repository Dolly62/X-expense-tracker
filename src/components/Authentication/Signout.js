import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthReducer";
import { useHistory } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useEffect } from "react";

const Signout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const timeout = 3600000; //1hr

  //--------------------------------AUTO LOGOUT AFTER 1HR. --------------------------------------//
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(authActions.logout());
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, timeout]);

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
