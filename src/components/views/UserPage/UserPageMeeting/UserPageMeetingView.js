import React from 'react'
import styled from 'styled-components'
import MypageSidemenuContainer from '../MyPageSidemenu/MyPageSidemenuContainer'

const UserPageMeetingView = () => {
  return (
    <UserPageMeetingViewContainer>  
        <MypageSidemenuContainer currentMenu="MyMeeting" />
        <MainContainer>
        <MyMeetingRoomContainer>
            <Title>내가 만든 미팅방</Title>
        </MyMeetingRoomContainer>
        <EnteringMeetingRoomContainer>
            <Title>내가 참여한 미팅방</Title>
        </EnteringMeetingRoomContainer>
        <AchieveRoomContainer>
            <Title>성사된 미팅방</Title>
        </AchieveRoomContainer>
        </MainContainer>
    </UserPageMeetingViewContainer>
    )
}

const UserPageMeetingViewContainer = styled.div`
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

const MyMeetingRoomContainer = styled.div`
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    min-height: 10rem;
    border-radius: 15px;
    padding: 2rem;
    flex-wrap: wrap;
    justify-content: center;  
`

const EnteringMeetingRoomContainer = styled.div`
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    min-height: 10rem;
    border-radius: 15px;
    padding: 2rem;
    flex-wrap: wrap;
    justify-content: center;  
`

const AchieveRoomContainer = styled.div`
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    min-height: 10rem;
    border-radius: 15px;
    padding: 2rem;
    flex-wrap: wrap;
    justify-content: center;  
`

const Title = styled.h2`

`

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;    
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;  // to give space between cards
    width: 100%;  // or adjust as required
    padding: 15px;
    border-radius: 10px;
    align-items: center;
    gap: 10px;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 15px;
    margin-bottom:5px;
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
`

const InfoButton = styled.button`
    border: none;
    padding: 8px 15px;
    border-radius: 10px;
    :hover{
        background-color: #e9e9e9;
    }
`;

const DoogeunButton = styled.button`
    border: none;
    padding: 8px 15px;
    border-radius: 10px;
    background-color: #ff2559;
    color: #f3f3f3;

`;

const ChatingButton = styled.button`
    border: none;
    padding: 8px 15px;
    border-radius: 10px;
    background-color: #ff2559;
    color: #f3f3f3;
`

export default UserPageMeetingView