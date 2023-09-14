import React,{useState} from 'react'
import styled from 'styled-components';
import MypageSidemenuContainer from '../MyPageSidemenu/MyPageSidemenuContainer';
import profileImage from "../../../../Img/BasicProfilePhoto.png";
import Chat from '../../../Chat/Chat';


const UserPageBlindDateView = ({ toLikeUser, fromLikeUser, matchUser, handleDooeun, handleChating, selectedUserId, roomId, userId }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const closeChat = () => {
      setIsChatOpen(false);  // 채팅 모달을 닫는 함수
    };
  return (
    <UserPageBlindDateViewContainer>
        <MypageSidemenuContainer currentMenu="MyBlindDate" />
        <MainContainer>
        <ToLikeContainer>
            <Title>내가 두근한 사람</Title>
            {
              toLikeUser.map((item) => (
                <ToLikeCardWrapper>
                    <ProfilePhoto
                        src={profileImage}
                        type="button"
                        alt="ProfilePhoto"
                        style={{ borderRadius: "50px" }}
                    />
                <Card key={item.userId}>
                    <div>{item.userId}님</div>
                    <div>{item.age}세</div>
                    <div>{item.department}</div>
                </Card>
                </ToLikeCardWrapper>
            ))
            }
        </ToLikeContainer>
        <FromLikeContainer>
            <Title>나를 두근한 사람</Title>
            {
              fromLikeUser.map((item) => (
                <CardWrapper>
                    <ProfilePhoto
                        src={profileImage}
                        type="button"
                        alt="ProfilePhoto"
                        style={{ borderRadius: "50px" }}
                    />
                <Card key={item.userId}>
                    <div>{item.userId}님</div>
                    <div>{item.age}세</div>
                    <div>{item.department}</div>
                </Card>
                <ButtonWrapper>
                    <InfoButton>상세정보 보기</InfoButton>
                    <DoogeunButton onClick={() => handleDooeun(item.userId)}>두근</DoogeunButton>
                </ButtonWrapper>
                </CardWrapper>
            ))
            }
        </FromLikeContainer>
        <MatchContainer>
            <Title>매칭된 사람</Title>
            {
              matchUser.map((item) => (
                <CardWrapper>
                    <ProfilePhoto
                        src={profileImage}
                        type="button"
                        alt="ProfilePhoto"
                        style={{ borderRadius: "50px" }}
                    />
                <Card key={item.userId}>
                    <div>{item.userId}님</div>
                    <div>{item.age}세</div>
                    <div>{item.department}</div>
                </Card>
                <ButtonWrapper>
                  <ChatingButton onClick={() => {
                    handleChating(item.userId);
                    setIsChatOpen(true);
                  }}>채팅하러 가기</ChatingButton>
                </ButtonWrapper>
                </CardWrapper>
            ))
            }
             {
                isChatOpen && selectedUserId && (
                    <Chat userId={userId} targetId={selectedUserId} roomId={roomId} onClose={closeChat} isChatOpen={isChatOpen}/>
                    )
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
    margin-bottom: 20px;
`

const ToLikeContainer = styled.div`
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

`;

const FromLikeContainer = styled.div`
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

const MatchContainer = styled.div`
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    display: flex;
    flex-direction: column;
    border: 2px solid #e9e9e9;
    width: 80%;
    min-height: 10rem;
    border-radius: 15px;
    margin-bottom: 10rem;
    padding: 2rem;
    flex-wrap: wrap;
    justify-content: center;

`

const MainContainer = styled.div`
    margin-top: 70px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

const ToLikeCardWrapper = styled.div`
    display: flex;
    flex-direction: row;    
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;  // to give space between cards
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    align-items: center;
    gap: 10px;
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
    justify-content: space-around;
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
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;  // ensure modal appears on top of other elements
`;

const ChatModalContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
`;

export default UserPageBlindDateView