import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getJWTCookie } from "../../../Api/loginApi";
import axios from "axios";

const RoomDataView = ({ roomData, hostStart, deleteRoom }) => {
  // 유저가 참여해 있는지 확인
  const [isUserIn, setIsUserIn] = useState(false);

  // 호스트가 있는지 확인
  const [isHostIn, setIsHostIn] = useState(false);

  useEffect(() => {
    userInCheck();
    hostInCheck();
  }, []);

  // const roomData = [
  //   {
  //     title: "ddd",
  //   },
  // ];

  // 해당 유저가 방에 있는지 체크
  const userInCheck = async () => {
    const userId = getJWTCookie("userId");

    const response = await roomData.members.find(
      (member) => member.userId === userId
    );

    if (response === undefined) {
      setIsUserIn(false);
      return;
    }
    if (response) {
      setIsUserIn(true);
      return;
    }
  };

  const hostInCheck = async () => {
    const userId = getJWTCookie("userId");

    if (roomData.hostId === userId) {
      setIsHostIn(true);
      return;
    } else {
      setIsHostIn(false);
      return;
    }
  };

  // 나가기 기능
  const registerOut = async (roomId) => {
    const authToken = getJWTCookie("jwtAccessToken");

    await axios
      .post(
        `http://${process.env.REACT_APP_SERVER_IP}/group/${roomId}/exit`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then(() => {
        console.log("미팅방 나가기 성공");
        alert("미팅방 나가기 성공");
        window.location.reload();
      })
      .catch((error) => {
        console.log("미팅방 나가기 실패" + error);
      });
  };

  return (
    <>
      <RoomDataWrapper>
        <RoomTitle>{roomData.title}</RoomTitle>
        <RoomIntro>소갯말 : {roomData.groupBlindIntroduction}</RoomIntro>
        <RoomPersonNum>
          {`현재인원) 남 ${roomData.presentMale} : 여 ${roomData.presentFemale}`}
        </RoomPersonNum>
        <UserDataWrapper>
          <MaleCol>
            {roomData.members.map((member, index) => {
              if (member.gender === "남") {
                return (
                  <div
                    key={index}
                  >{`${member.department} : (${member.age})`}</div>
                );
              }
            })}
          </MaleCol>
          <FemaleCol>
            {roomData.members.map((member, index) => {
              if (member.gender === "여") {
                return (
                  <div
                    key={index}
                  >{`${member.department} : (${member.age})`}</div>
                );
              }
            })}
          </FemaleCol>
        </UserDataWrapper>
        <BtnContainer>
          {true ? (
            <>
              <StartBtn
                onClick={() => {
                  hostStart(roomData.roomId);
                }}
              >
                시작
              </StartBtn>
              <EndBtn
                onClick={() => {
                  deleteRoom(roomData.roomId);
                }}
              >
                미팅방 삭제하기
              </EndBtn>
            </>
          ) : isUserIn === true ? (
            <RoomRegisterOutBtn
              onClick={() => {
                registerOut(roomData.roomId);
              }}
            >
              나가기
            </RoomRegisterOutBtn>
          ) : (
            <></>
          )}
        </BtnContainer>
      </RoomDataWrapper>
    </>
  );
};

const styledButton = `
  border: 1px solid #ff4572;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  width: 150px;
  color: white;
  background: transparent;
  padding: 0.3rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: #ff4572;
  margin-top: 10px;

  &:hover {
    transform: scale(1.05);
  }
`;

const BtnContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StartBtn = styled.button`
  ${styledButton}
`;

const EndBtn = styled.button`
  ${styledButton}
`;

const RoomRegisterOutBtn = styled.button`
  ${styledButton}
`;

const RoomDataWrapper = styled.div`
  width: 100%;
  justify-content: center;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-weight: 300;
`;

const RoomTitle = styled.h2`
  margin: 20px auto;
  background-color: #ff4572;
  border: 1px solid #ff4572;
  border-radius: 6px;
  max-width: 70%;
  color: white;
  max-height: 40px;
`;
const RoomIntro = styled.div`
  margin: 0 auto;
  max-width: 80%;
  margin-bottom: 20px;
`;
const RoomPersonNum = styled.div`
  color: #ff4572;
  margin-bottom: 30px;
`;

const UserDataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MaleCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  padding-right: 20px;
  width: 150px;
`;

const FemaleCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 150px;
  padding-left: 20px;
`;

export default RoomDataView;
