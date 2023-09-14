import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import profileImage from "../../../../Img/BasicProfilePhoto.png";
import { getJWTCookie } from '../../../Api/loginApi';

const MypageSidemenuView = ({
  currentMenu,
  onUserSettingClick,
  onMeetingSetting,
  onBlindDateSetting,
  userInfo
}) => {
  const navigate = useNavigate();

  const [meetAccordian, setMeetAccordian] = useState(false);
  const [blindDateAccordian, setBlindDateAccordian] = useState(false);
  const [isUserSettingHovered, setIsUserSettingHovered] = useState(false);
  const [isMyPostsHovered, setIsMyPostsHovered] = useState(false);
  const [isMyScrapHovered, setIsMyScrapHovered] = useState(false);

  const userId = getJWTCookie('userId');

  const handleMenuClick = (menu) => {
    setBlindDateAccordian(!menu);
  };

  return (
    <SidemenuContainer>
        <ProfilePhotoWrapper>
          <ProfilePhoto
            src={profileImage}
            type="button"
            alt="ProfilePhoto"
            style={{ borderRadius: "50px" }}
          />
        </ProfilePhotoWrapper>
        <ProfileTextWrapper>
          <UserName>{userId}</UserName>
          <UserEmail>{userInfo.email}</UserEmail>
        </ProfileTextWrapper>
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
            onClick={() => navigate('/mypage/blinddate')}

          >
            소개팅
          </Sidemenu>
        </SidemenuContentWrapper>
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
            onClick={() => navigate('/mypage/meeting')}
          >
            미팅
          </Sidemenu>
        </SidemenuContentWrapper>
      </SidemenuContensContainer>
    </SidemenuContainer>
  );
};

const SidemenuContainer = styled.div`
  width: 30%;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 30px;
  border-right: 1px solid #e9e9e9;
  border-left: 1px solid #e9e9e9;
  box-shadow: 3px 0 4px rgba(0, 0, 0, 0.1);

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
  width: 260px;
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

const ProfilePhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const ProfilePhoto = styled.img`
  width: 100px;
  height: 100px;
`;

const ProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const UserName = styled.h2`
  font-weight: 700;
  margin: 0;
`

const UserEmail = styled.p`
  color: #747474;
`

export default MypageSidemenuView;
