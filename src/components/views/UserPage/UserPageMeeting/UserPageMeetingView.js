import React from 'react'
import styled from 'styled-components'
import MypageSidemenuContainer from '../MyPageSidemenu/MyPageSidemenuContainer'

const UserPageMeetingView = ({myMeetingRoom, enteringMeetingRoom,achieveMeetingRoom}) => {
  return (
    <UserPageMeetingViewContainer>  
        <MypageSidemenuContainer currentMenu="MyMeeting" />
        <MainContainer>
        <MyMeetingRoomContainer>
            <Title>내가 만든 미팅방</Title>
            {
              myMeetingRoom.map((item) => (
                <MyMeetingRoomCardWrapper>
                    <Card key={item.roomId}>
                        <div>방 제목: {item.title}</div>
                    </Card>
                    <ButtonWrapper>
                        <InfoButton>상세정보 보기</InfoButton>
                    </ButtonWrapper>
                </MyMeetingRoomCardWrapper>
            ))
            }
        </MyMeetingRoomContainer>
        <EnteringMeetingRoomContainer>
            <Title>내가 참여한 미팅방</Title>
            {
              enteringMeetingRoom.map((item) => (
                <CardWrapper>
                    <Card key={item.roomId}>
                        <div>방 제목: {item.title}</div>
                    </Card>

                    <ButtonWrapper>
                        <InfoButton>상세정보 보기</InfoButton>
                    </ButtonWrapper>
                </CardWrapper>
            ))
            }
        </EnteringMeetingRoomContainer>
        <AchieveRoomContainer>
            <Title>성사된 미팅방</Title>
            {
              achieveMeetingRoom.map((item) => (
                <CardWrapper>
                    <Card key={item.roomId}>
                        <div>방 제목: {item.title}</div>
                    </Card>

                    <ButtonWrapper>
                        <InfoButton>상세정보 보기</InfoButton>
                    </ButtonWrapper>
                </CardWrapper>
            ))
            }
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
    margin-bottom: 10rem;
`;

const MyMeetingRoomCardWrapper = styled.div`
    display: flex;
    flex-direction: row;    
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;  // to give space between cards
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
`

const MyMeetingRoomContainer = styled.div`
    font-family: "NanumSquareRoundBold";
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
    font-family: "NanumSquareRoundBold";
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    min-height: 10rem;
    border-radius: 15px;
    padding: 2rem;
    flex-wrap: wrap;
    justify-content: space-between;
`

const AchieveRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    min-height: 10rem;
    border-radius: 15px;
    padding: 2rem;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Title = styled.h4`
    font-family: "NanumSquareRoundExtraBold";

`

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;    
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;  // to give space between cards
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 15px;
    justify-content: center;
    align-items: center;
`;

const InfoButton = styled.button`
    border: none;
    padding: 8px 15px;
    border-radius: 10px;
    :hover{
        background-color: #e9e9e9;
    }
`;


const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 160px;
`;

export default UserPageMeetingView