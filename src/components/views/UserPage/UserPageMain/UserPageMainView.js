import React from 'react'
import MypageSidemenuContainer from '../MyPageSidemenu/MyPageSidemenuContainer';
import styled from 'styled-components';

const UserPageMainView = ({userInfo, changePassword}) => {
  return (
    <UserPageMainViewContainer>
        <MypageSidemenuContainer currentMenu="UserSetting" />
        <MainContainer>
            <BasicInfo>
                <p style={{padding: "20px", fontWeight: "700"}}>기본 정보</p>
                <h3>{userInfo.name}님</h3>
                <p>{userInfo.description}</p>
                <p>{userInfo.uniName}</p>
                <p>{userInfo.age}</p>
                <p>{userInfo.gender}</p>

            </BasicInfo>
            <ChangePassword>
                <p style={{padding: "20px", fontWeight: "700"}}>비밀번호 변경</p>
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
  )
}

const UserPageMainViewContainer = styled.div`
    display: flex;
    min-height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
`;


const MainContainer = styled.div`
    margin-top: 70px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

const BasicInfo = styled.div`
    border: 2px solid #e9e9e9;
    width: 80%;
    height: 30rem;
    border-radius: 15px;
`;

const ChangePassword = styled.div`
    border: 2px solid #e9e9e9;
    width: 80%;
    height: 20rem;
    border-radius: 15px;
`

const PasswordForm = styled.form`
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


export default UserPageMainView