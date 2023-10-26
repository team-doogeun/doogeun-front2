import React, { useState } from "react";
import styled from "styled-components";
import MypageSidemenuContainer from "../MyPageSidemenu/MyPageSidemenuContainer";
import profileImage from "../../../../Img/BasicProfilePhoto.png";
import Chat from "../../../Chat/Chat";

const UserPageBlindDateView = ({
  toLikeUser,
  fromLikeUser,
  matchUser,
  handleDooeun,
  handleChating,
  selectedUserId,
  chatList,
  roomId,
  userId,
  handleInfo,
  userIdInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const InfoModal = ({ isOpen, close }) => {
    console.log(userIdInfo);
    return (
      <ModalBackground isOpen={isOpen}>
        <ModalContainer>
          <ModalContent>{userIdInfo.userId}</ModalContent>
          <ModalSecondContent>{userIdInfo.name}님</ModalSecondContent>
          <ModalSecondContent>{userIdInfo.age}세</ModalSecondContent>
          <ModalSecondContent>{userIdInfo.studentId}</ModalSecondContent>
          <ModalSecondContent>{userIdInfo.height}cm</ModalSecondContent>
          <ModalSecondContent>{userIdInfo.bodyType}</ModalSecondContent>
          <ModalSecondContent>{userIdInfo.addressType}</ModalSecondContent>
          <ModalFooter>
            <ConfirmButton onClick={close}>확인</ConfirmButton>
          </ModalFooter>
        </ModalContainer>
      </ModalBackground>
    );
  };

  const Modal = ({ isOpen, close }) => {
    return (
      <ModalBackground isOpen={isOpen}>
        <ModalContainer>
          <ModalContent>💕 두근 시그널을 보냈어요! 💕</ModalContent>
          <ModalFooter>
            <ConfirmButton onClick={close}>확인</ConfirmButton>
          </ModalFooter>
        </ModalContainer>
      </ModalBackground>
    );
  };

  return (
    <UserPageBlindDateViewContainer>
      <MypageSidemenuContainer currentMenu="MyBlindDate" />
      <MainContainer>
        <ToLikeContainer>
          <Title>내가 두근한 사람</Title>
          {toLikeUser.map((item) => (
            <ToLikeCardWrapper>
              <ProfilePhoto
                src={profileImage}
                type="button"
                alt="ProfilePhoto"
                style={{ borderRadius: "50px" }}
              />
              <Card key={item.userId}>
                <div>{item.userId}님</div>
                <div>{item.age}세</div>
                <div>{item.department}</div>
              </Card>
            </ToLikeCardWrapper>
          ))}
        </ToLikeContainer>
        <FromLikeContainer>
          <Title>나를 두근한 사람</Title>
          {fromLikeUser.map((item) => (
            <CardWrapper>
              <ProfilePhoto
                src={profileImage}
                type="button"
                alt="ProfilePhoto"
                style={{ borderRadius: "50px" }}
              />
              <Card key={item.userId}>
                <div>{item.userId}님</div>
                <div>{item.age}세</div>
                <div>{item.department}</div>
              </Card>
              <ButtonWrapper>
                <InfoButton
                  onClick={() => {
                    setIsInfoModalOpen(!isInfoModalOpen);
                    handleInfo(item.userId);
                  }}
                >
                  상세정보 보기
                </InfoButton>
                <DoogeunButton
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    handleDooeun(item.userId);
                  }}
                >
                  두근
                </DoogeunButton>
              </ButtonWrapper>
            </CardWrapper>
          ))}
        </FromLikeContainer>
        {userIdInfo && (
          <InfoModal isOpen={isInfoModalOpen} close={closeInfoModal} />
        )}
        <Modal isOpen={isModalOpen} close={closeModal} />
        <MatchContainer>
          <Title>매칭된 사람</Title>
          {matchUser.map((item) => (
            <CardWrapper>
              <ProfilePhoto
                src={profileImage}
                type="button"
                alt="ProfilePhoto"
                style={{ borderRadius: "50px" }}
              />
              <Card key={item.userId}>
                <div>{item.userId}님</div>
                <div>{item.age}세</div>
                <div>{item.department}</div>
              </Card>
              <ButtonWrapper>
                <ChatingButton
                  onClick={() => {
                    handleChating(item.userId);
                    console.log(item.userId);
                    setIsOpen(true);
                  }}
                >
                  채팅하러 가기
                </ChatingButton>
              </ButtonWrapper>
            </CardWrapper>
          ))}
          {isOpen && selectedUserId && roomId && (
            <Chat
              sender={userId}
              receiver={selectedUserId}
              roomId={roomId}
              chatList={chatList}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              onClose={onClose}
            />
          )}
        </MatchContainer>
      </MainContainer>
    </UserPageBlindDateViewContainer>
  );
};

const UserPageBlindDateViewContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h4`
  font-family: "NanumSquareRoundExtraBold";
  margin-bottom: 20px;
`;

const ToLikeContainer = styled.div`
  font-family: "NanumSquareRoundBold";
  display: flex;
  flex-direction: column;
  border: 2px solid #e9e9e9;
  width: 80%;
  min-height: 10rem;
  border-radius: 15px;
  padding: 2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const FromLikeContainer = styled.div`
  font-family: "NanumSquareRoundBold";
  display: flex;
  flex-direction: column;
  border: 2px solid #e9e9e9;
  width: 80%;
  min-height: 10rem;
  border-radius: 15px;
  padding: 2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const MatchContainer = styled.div`
  font-family: "NanumSquareRoundBold";
  display: flex;
  flex-direction: column;
  border: 2px solid #e9e9e9;
  width: 80%;
  min-height: 10rem;
  border-radius: 15px;
  margin-bottom: 10rem;
  padding: 2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const MainContainer = styled.div`
  margin-top: 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const ToLikeCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px; // to give space between cards
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  gap: 10px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px; // to give space between cards
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  gap: 10px;
  justify-content: space-around;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 5px;
`;

const ProfilePhoto = styled.img`
  width: 80px;
  height: 80px;
  margin-left: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 160px;
`;

const InfoButton = styled.button`
  font-family: "NanumSquareRoundExtraBold";
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  :hover {
    background-color: #e9e9e9;
  }
`;

const DoogeunButton = styled.button`
  font-family: "NanumSquareRoundExtraBold";
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  background-color: #ff2559;
  color: #f3f3f3;
`;

const ChatingButton = styled.button`
  font-family: "NanumSquareRoundExtraBold";
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  background-color: #ff2559;
  color: #f3f3f3;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const ModalContainer = styled.div`
  width: 400px;
  background: #f9f9f9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
`;
const ModalContent = styled.div`
  padding-bottom: 25px;
  padding-top: 10px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
`;

const ModalSecondContent = styled.div`
  margin: 5px;
  text-align: center;
  font-size: 16px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  border: none;
  background-color: #ff2559;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  color: #fff;
  font-weight: 700;
  margin-top: 20px;
`;

export default UserPageBlindDateView;
