import React, { useState, useEffect } from 'react';
import MyPageSidemenuContainer from '../MyPageSidemenu/MyPageSidemenuContainer';
import styled from 'styled-components';
import { getJWTCookie } from '../../../Api/loginApi';
import profileImage from '../../../../Img/BasicProfilePhoto.png';
import axios from "axios";

const UserSettingView = ({  changePassword }) => {
  const userName = getJWTCookie('name');
  const [isEditInfo, setIsEditInfo] = useState(true);
  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie("jwtAccessToken");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/profile`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUserInfo(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId, authToken]);

  return (
    <UserSettingLayout>
      <UserSettingContainer>
        <MyPageSidemenuContainer currentMenu="UserSetting" />
        <UserSettingWrapper>
          <UserinfoTitle>기본 정보</UserinfoTitle>
          <UserinfoBox>
            <UserinfoWrapper>
              <ProfilePhoto src={profileImage} />
              <Userinfo>
                <UserNicknameWrapper>
                  <UserName>{userName}님</UserName>
                  <UserinfoEditBtn
                  >
                    정보 수정
                  </UserinfoEditBtn>
                </UserNicknameWrapper>
                <UserInfoData>이름 : {userInfo.externalId}</UserInfoData>
                <UserInfoData>이메일 : {userInfo.email}</UserInfoData>
                <UserInfoData>자기 소개 : {userInfo.description}</UserInfoData>
                  <UserOtherInfo>
                  </UserOtherInfo>
              </Userinfo>
            </UserinfoWrapper>
          </UserinfoBox>
          <UserPassword>비밀번호 변경</UserPassword>
          <UserPasswordBox>
            <PasswordForm>
              <PasswordInput>
                <ChangePasswordBox placeholder="비밀번호"></ChangePasswordBox>
                <ChangePasswordBox placeholder="비밀번호 확인"></ChangePasswordBox>
              </PasswordInput>
              <UserPasswordEditBtn onClick={changePassword}>
                비밀번호 변경
              </UserPasswordEditBtn>
            </PasswordForm>
          </UserPasswordBox>
        </UserSettingWrapper>
      </UserSettingContainer>
    </UserSettingLayout>
  );
};

export default UserSettingView;

const commonTextStyle = {
  width: '250px',
  height: '20px',
  fontFamily: 'Noto Sans KR',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#242424',
};

const UserSettingLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  background-color: #f3f3f3;
`;

const UserSettingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UserSettingWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  max-height: 700px;
  max-width: 1000px;
  flex-direction: column;
  justify-content: left;
  margin-top: 80px;
`;

const UserinfoTitle = styled.div`
  position: relative;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: #242424;
`;

const UserinfoBox = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 720px;
  min-height: 250px;
  max-height: 380px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  margin-top: 10px;
  `;

const UserinfoWrapper = styled.div`
  width: fit-content;
  max-height: 700px;
  display: flex;
  flex-direction: row;
  padding-top: 36px;
  padding-left: 36px;
  padding-bottom: 36px;
`;

const ProfilePhoto = styled.img`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 50px;
`;

const Userinfo = styled.div`
  width: 490px;
  min-height: 120px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
`;

const UserNicknameWrapper = styled.div`
  display: flex;
  margin-bottom: 18px;
  justify-content: space-between;

`;

const UserName = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: #242424;
  margin-right: 20px;
`;

const UserinfoEditBtn = styled.button`
  position: relative;
  width: 80px;
  height: 30px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  background: #ff2559;
  border-radius: 4px;
  border: #ff2559;
  cursor: pointer;

`;

const UserOtherInfo = styled.div`
  width: 500px;
  height: 300px;
`;

const UserInfoData = styled.div`
  ${commonTextStyle}
  margin-top: 8px;
`;

const UserIdTitle = styled.div`
  position: relative;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #5c5c5c;
`;

const UserPassword = styled.div`
  position: relative;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: #000000;
  margin-top: 46px;
`;

const UserPasswordBox = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 720px;
  height: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  margin-top: 16px;

`;

const PasswordForm = styled.form`
  width: 760px;
  height: 180px;
  display: flex;
  flex-direction: row;
`;

const PasswordInput = styled.div`
  height: 180px;
  width: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const ChangePasswordBox = styled.input`
  width: 340px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  margin-left: 40px;
  padding-left: 15px;
  ::placeholder {
    color: #a5a5a5;
  }
`;

const UserPasswordEditBtn = styled.button`
  position: relative;
  width: 130px;
  height: 40px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  background: #ff2559;
  border-radius: 4px;
  border: #2e55e7;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 103px;

  cursor: pointer;
`;
