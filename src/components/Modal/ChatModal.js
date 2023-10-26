import React from "react";
import styled from "styled-components";

const ChatModal = ({ setIsOpen, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    setIsOpen(!isOpen);
    if (onClose) onClose(e); // onClose가 존재할 때만 호출
  };

  return (
    <ModalOverlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative; // 닫기 버튼의 절대 위치를 위한 상대 위치 설정
  background-color: #fff;
  padding: 20px;
  padding-top: 20px;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute; // 모달 상단 우측에 배치
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 24px; // 크기 조정
  cursor: pointer;
`;

export default ChatModal;
