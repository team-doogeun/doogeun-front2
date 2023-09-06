import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MypageSidemenuView = ({
  currentMenu,
  onUserSettingClick,
  onMeetingSetting,
  onBlindDateSetting,
}) => {
  const navigate = useNavigate();

  const [meetAccordian, setMeetAccordian] = useState(false);
  const [blindDateAccordian, setBlindDateAccordian] = useState(false);

  const [isUserSettingHovered, setIsUserSettingHovered] = useState(false);
  const [isMyPostsHovered, setIsMyPostsHovered] = useState(false);
  const [isMyScrapHovered, setIsMyScrapHovered] = useState(false);

  const handleMenuClick = (menu) => {
    setBlindDateAccordian(!menu);
  };

  return (
    <SidemenuContainer>
      <SidemenuTitle>내 정보 관리</SidemenuTitle>
      <SidemenuContensContainer>
        <SidemenuContentWrapper
          backgroundColor={
            currentMenu === "UserSetting"
              ? "rgba(255, 37, 89, 0.1)"
              : "transparent"
          }
          onMouseEnter={() => setIsUserSettingHovered(true)}
          onMouseLeave={() => setIsUserSettingHovered(false)}
          onClick={() => onUserSettingClick()}
        >
          <Sidemenu
            fontColor={currentMenu === "UserSetting" ? "#ff2559" : "#737373"}
          >
            내 정보
          </Sidemenu>
        </SidemenuContentWrapper>
        <SidemenuContentWrapper
          backgroundColor={
            currentMenu === "MyBlindDate"
              ? "rgba(255, 37, 89, 0.1)"
              : "transparent"
          }
          onMouseEnter={() => setIsMyPostsHovered(true)}
          onMouseLeave={() => setIsMyPostsHovered(false)}
          onClick={() => setBlindDateAccordian(!blindDateAccordian)}
        >
          <Sidemenu
            fontColor={currentMenu === "MyBlindDate" ? "#ff2559" : "#737373"}
          >
            소개팅
          </Sidemenu>
        </SidemenuContentWrapper>
        {blindDateAccordian && (
          <AccordianContent>
            <ListItem
              onClick={() => {
                navigate("/my-page/blindDate/toLike");
              }}
            >
              내가 두근한 사람
            </ListItem>
            <ListItem
              onClick={() => {
                navigate("/my-page/blindDate/fromLike");
              }}
            >
              나를 두근한 사람
            </ListItem>
            <ListItem
              onClick={() => {
                navigate("/my-page/blindDate/matches");
              }}
            >
              매칭
            </ListItem>
          </AccordianContent>
        )}
        <SidemenuContentWrapper
          backgroundColor={
            currentMenu === "MyMeeting"
              ? "rgba(255, 37, 89, 0.1)"
              : "transparent"
          }
          onMouseEnter={() => setIsMyScrapHovered(true)}
          onMouseLeave={() => setIsMyScrapHovered(false)}
          onClick={() => setMeetAccordian(!meetAccordian)}
        >
          <Sidemenu
            fontColor={currentMenu === "MyMeeting" ? "#ff2559" : "#737373"}
          >
            미팅
          </Sidemenu>
        </SidemenuContentWrapper>
        {meetAccordian && (
          <AccordianContent>
            <ListItem
              onClick={() => {
                navigate("/my-page/meeting/my-rooms");
              }}
            >
              내가 만든 미팅방
            </ListItem>
            <ListItem
              onClick={() => {
                navigate("/my-page/meeting/entering");
              }}
            >
              내가 입장한 미팅방
            </ListItem>
            <ListItem
              onClick={() => {
                navigate("/my-page/meeting/achieve");
              }}
            >
              성사된 미팅방
            </ListItem>
          </AccordianContent>
        )}
      </SidemenuContensContainer>
    </SidemenuContainer>
  );
};

const SidemenuContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 80px;
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  height: 600px;
  border: 1px solid #e9e9e9;
`;

const SidemenuTitle = styled.div`
  position: relative;
  width: 180px;
  height: 50px;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 46px;
  color: #252525;
  background-color: #fff;

`;

const SidemenuContensContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  & > div:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const SidemenuContentWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${(props) => props.backgroundColor};
  border-radius: 8px;
  padding-left: 20px;

  :hover {
    background: ${(props) =>
      props.backgroundColor === "transparent"
        ? "rgba(255, 37, 89, 0.1)"
        : "rgba(255, 37, 89, 0.1)"};
  }
`;
const Sidemenu = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 250px;
  height: 50px;

  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  color: ${(props) => props.fontColor};
  margin-left: 12px;

  cursor: pointer;
  :hover {
    color: #ff2559;
  }
`;

const AccordianContent = styled.div`
  position: relative;
  width: 250px;
  max-height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
`;

const ListItem = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 250px;
  height: 46px;
  border-radius: 8px;

  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #737373;

  padding-left: 45px;
  cursor: pointer;

  :hover {
    color: #ff2559;
    background-color: rgba(255, 37, 89, 0.1);
  }
`;

export default MypageSidemenuView;
