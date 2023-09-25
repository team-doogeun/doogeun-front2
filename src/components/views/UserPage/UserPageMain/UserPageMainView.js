import React from "react";
import MypageSidemenuContainer from "../MyPageSidemenu/MyPageSidemenuContainer";
import styled from "styled-components";

const UserPageMainView = ({ userInfo, changePassword, idealInfo }) => {
  return (
    <UserPageMainViewContainer>
      <MypageSidemenuContainer currentMenu="UserSetting" />
      <MainContainer>
        <BasicInfo>
          <Title>기본 정보</Title>
          <InfoRow>
            <label>이름:</label>
            <span>{userInfo.name}님</span>
          </InfoRow>
          <InfoRow>
            <label>자기소개:</label>
            <span>{userInfo.description}</span>
          </InfoRow>
          <InfoRow>
            <label>대학:</label>
            <span>{userInfo.uniName}</span>
          </InfoRow>
          <InfoRow>
            <label>나이:</label>
            <span>{userInfo.age}</span>
          </InfoRow>
          <InfoRow>
            <label>성별:</label>
            <span>{userInfo.gender}</span>
          </InfoRow>
        </BasicInfo>
        <IdealInfo>
          <Title>이상형 정보</Title>
          <InfoRow>
            <label>MBTI:</label>
            <span>{idealInfo.idealMbti}</span>
          </InfoRow>
          <InfoRow>
            <label>나이:</label>
            <span>{idealInfo.idealAge}</span>
          </InfoRow>
          <InfoRow>
            <label>키:</label>
            <span>{idealInfo.idealHeight}</span>
          </InfoRow>
          <InfoRow>
            <label>체형:</label>
            <span>{idealInfo.idealBodyType}</span>
          </InfoRow>
          <InfoRow>
            <label>취미:</label>
            <span>
              {idealInfo.firstIdealHobby}, {idealInfo.secondIdealHobby}
            </span>
          </InfoRow>
        </IdealInfo>
        <ChangePassword>
          <Title>비밀번호 변경</Title>
          <PasswordForm>
            <PasswordInput>
              <ChangePasswordBox placeholder="비밀번호"></ChangePasswordBox>
              <ChangePasswordBox placeholder="비밀번호 확인"></ChangePasswordBox>
            </PasswordInput>
            <UserPasswordEditBtn onClick={changePassword}>
              비밀번호 변경
            </UserPasswordEditBtn>
          </PasswordForm>
        </ChangePassword>
      </MainContainer>
    </UserPageMainViewContainer>
  );
};

const UserPageMainViewContainer = styled.div`
  font-family: "NanumSquareRoundBold";
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
`;

const MainContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const BasicInfo = styled.div`
  border: 2px solid #e9e9e9;
  width: 80%;
  height: 18rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 10px;
`;

const Title = styled.h4`
  font-family: "NanumSquareRoundExtraBold";
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;

  label {
    font-weight: bold;
    margin-right: 10px;
  }
`;

const ChangePassword = styled.div`
  border: 2px solid #e9e9e9;
  width: 80%;
  height: 15rem;
  border-radius: 15px;
  padding: 30px;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: row;
`;

const PasswordInput = styled.div`
  height: 150px;
  width: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const ChangePasswordBox = styled.input`
  width: 370px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  padding-left: 15px;
  ::placeholder {
    color: #a5a5a5;
  }
`;

const UserPasswordEditBtn = styled.button`
  width: 150px;
  height: 48px;
  font-family: "Noto Sans KR";
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
  margin-top: 86px;

  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Transition 효과 추가 */

  &:hover {
    background-color: #ff4780;
    transform: scale(1.05);
  }
`;

const IdealInfo = styled.div`
  border: 2px solid #e9e9e9;
  width: 80%;
  height: 18rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 10px;
`;

export default UserPageMainView;
