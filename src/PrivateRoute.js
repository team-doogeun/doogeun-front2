import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkJWTCookieExistence } from "./components/Api/loginApi";
import LoginModal from "./components/Modal/LoginModal";
import SignInContainer from "./components/views/SignInPage/SignInContainer";

const PrivateRoute = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  if (!checkJWTCookieExistence()) {
    navigator("/");
    return (
      <LoginModal
        CloseModal={() => {
          setShowModal(!showModal);
        }}
      >
        <SignInContainer />
      </LoginModal>
    );
  }
  return children;
};

export default PrivateRoute;
