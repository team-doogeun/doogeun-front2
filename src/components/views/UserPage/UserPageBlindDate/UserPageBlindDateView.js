import React from 'react'
import styled from 'styled-components';
import MypageSidemenuContainer from '../MyPageSidemenu/MyPageSidemenuContainer';

const UserPageBlindDateView = ({ toLikeUser, fromLikeUser, matchUser }) => {
  return (
    <UserPageBlindDateViewContainer>
        <MypageSidemenuContainer currentMenu="MyBlindDate" />
        <MainContainer>
        <ToLikeContainer>
            <Title>내가 두근한 사람</Title>
            {
              toLikeUser.map((item) => (
                <div key={item.userId}>
                    <div>{item.userId}</div>
                    <div>{item.age}</div>
                    <div>{item.department}</div>
                    <div>---------</div>

                </div>
            ))
            }
        </ToLikeContainer>
        <FromLikeContainer>
            <Title>나를 두근한 사람</Title>
            {
              fromLikeUser.map((item) => (
                <div key={item.userId}>
                    <div>{item.userId}</div>
                    <div>{item.age}</div>
                    <div>{item.department}</div>
                    <div>---------</div>

                </div>
            ))
            }
        </FromLikeContainer>
        <MatchContainer>
            <Title>매칭된 사람</Title>
            {
              matchUser.map((item) => (
                <div key={item.userId}>
                    <div>{item.userId}</div>
                    <div>{item.age}</div>
                    <div>{item.department}</div>
                    <div>---------</div>
                </div>
            ))
            }
        </MatchContainer>
        </MainContainer>
    </UserPageBlindDateViewContainer>
  )
}

const UserPageBlindDateViewContainer = styled.div`
    display: flex;
    min-height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
`;

const Title = styled.h3`

`

const ToLikeContainer = styled.div`
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    height: 30rem;
    border-radius: 15px;
    padding: 2rem;


`;

const FromLikeContainer = styled.div`
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    height: 30rem;
    border-radius: 15px;
    padding: 2rem;
`

const MatchContainer = styled.div`
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    height: 30rem;
    border-radius: 15px;
    margin-bottom: 10rem;
    padding: 2rem;

`

const MainContainer = styled.div`
    margin-top: 70px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

export default UserPageBlindDateView