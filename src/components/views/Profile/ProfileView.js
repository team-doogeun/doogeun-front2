import React from "react";
import styled from "styled-components";
import profileImage from "../../../Img/BasicProfilePhoto.png";

const ProfileView = ({ logoutHandler, userName, navigator }) => {
  return (
    <ProfileContainer>
      <Triangle />
      <ProfileWrapper>
        <UserInfo>
          <ProfilePhotoWrapper>
            <ProfilePhoto
              src={profileImage}
              type="button"
              onClick={() => navigator("/my-page")}
              alt="ProfilePhoto"
              style={{ borderRadius: "4px" }}
            />
          </ProfilePhotoWrapper>
          <UserNicknameWrapper
            type="button"
            onClick={() => navigator("/my-page")}
          >
            {userName}님
          </UserNicknameWrapper>
        </UserInfo>
        <ProfileMenuWrapper>
          <ProfileMenu onClick={() => navigator("/my-page/blindDate/toLike")}>
            내 소개팅
          </ProfileMenu>
          <ProfileMenu
            type="button"
            onClick={() => navigator("/my-page/meeting/my-rooms")}
          >
            내 미팅
          </ProfileMenu>
          <ProfileMenu type="button" onClick={logoutHandler}>
            로그아웃
          </ProfileMenu>
        </ProfileMenuWrapper>
      </ProfileWrapper>
    </ProfileContainer>
  );
};
const ProfileContainer = styled.div`
  top: 40px;
  left: -30px;
  position: absolute;
  width: fit-content;
  height: 320px;
`;
const Triangle = styled.div`
  position: relative;

  width: 16px;
  height: 16px;

  background: #ffffff;
  transform: rotate(45deg);
  left: 42px;
  top: 8px;
  box-sizing: border-box;
  border-top: 1px solid #747474;
  border-left: 1px solid #747474;
  z-index: 1;
`;
const ProfileWrapper = styled.div`
  position: absolute;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 300px;
  text-align: center;
  align-items: center;
  border: 1px solid #747474;
  border-radius: 5px;
  box-sizing: border-box;
`;
const UserInfo = styled.div`
  position: relative;
  width: 173px;
  height: 147px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  border-bottom: 1px solid #dddddd;
`;
const ProfilePhotoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: fit-content;
  height: fit-content;
`;
const ProfilePhoto = styled.img`
  position: relative;
  cursor: pointer;
  width: 70px;
  height: 70px;
`;
const UserNicknameWrapper = styled.div`
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);

  width: 160px;
  height: 30px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;

  color: #ff2556;
  cursor: pointer;
`;

const ProfileMenuWrapper = styled.div`
  position: relative;
  width: 175px;
  height: 150px;

  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  margin-top: 22px;

  border-bottom: 1px solid #dddddd;

  & > div:not(:last-child) {
    margin-bottom: 14px;
  }
`;

const ProfileMenu = styled.div`
  cursor: pointer;
  position: relative;
  width: 150px;
  height: 25px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  color: #5c5c5c;
  :hover {
    color: #ff2556;
    font-weight: 700;
  }
`;

export default ProfileView;
