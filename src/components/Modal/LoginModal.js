import React, { useEffect } from "react";
import styled from "styled-components";
import XIcon from "../../Img/closeIcon.png";
import { useNavigate } from "react-router-dom";
const LoginModal = (props) => {
  const navigator = useNavigate();
  const CloseModal = () => {
    props.CloseModal();
  };

  useEffect(() => {
    return () => {
      CloseModal();
    };
  }, [navigator]);

  return (
    <ModalWrapper>
      <ModalBody>
        <ModalCloseButton src={XIcon} onClick={CloseModal}></ModalCloseButton>
        {props.children}
      </ModalBody>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalCloseButton = styled.img`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  height: 24px;
  border: none;
  width: 14px;
  height: 14px;
  z-index: 2;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  position: absolute;
  width: 400px;
  height: 450px;
  text-align: center;
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  z-index: 2;
  animation: modaldown 0.25s linear;

  @keyframes modaldown {
    from {
      transform: translateY(-5%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export default LoginModal;
