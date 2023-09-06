import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // This is required for carousel styling
import GmarketSansTTFBold from "../../../fonts/GmarketSansTTFBold.ttf";

const BlindDateView = ({ getUserData, buttonLike, getDataAtSpecificTime }) => {
  const [userData, setUserData] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSecondCardFlipped, setIsSecondCardFlipped] = useState(false);
  const [user1Image, setUser1Image] = useState([]);
  const [user2Image, setUser2Image] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (userId) => {
    buttonLike(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Modal = ({ isOpen, close }) => {
    return (
      <ModalBackground isOpen={isOpen}>
        <ModalContainer>
          <ModalContent>
          💕 두근 시그널을 보냈어요! 💕
          </ModalContent>
          <ModalFooter>
            <ConfirmButton onClick={close}>확인</ConfirmButton>
          </ModalFooter>
        </ModalContainer>
      </ModalBackground>
    );
  };
    
  useEffect(() => {
    userDataSetting();
  }, []);

  // userData 세팅
  const userDataSetting = async () => {
    try {
      // 일단 처음에 유저 1번 받아오기
      const Data = await getUserData();

      if (Data) {
        setUserData(Data);
        const user1Image = [
          Data.basicFilePath,
          Data.secondFilePath,
          Data.thirdFilePath,
        ];
        if (user1Image[0]) setUser1Image([...user1Image]);

        const user2Image = [
          Data.basicFilePathSec,
          Data.secondFilePathSec,
          Data.thirdFilePathSec,
        ];
        if (user2Image[0]) setUser2Image([...user2Image]);

        console.log("유저 데이터 저장 성공");
      } else {
        console.log("유저 데이터가 유효하지 않습니다. ", Data);
      }
    } catch (error) {
      console.log("유저 데이터 받기 실패 : ", error);
    }
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSecondCardClick = () => {
    setIsSecondCardFlipped(!isSecondCardFlipped);
  };

  return (
    <BlindDateWrapper>
      <WriteContainer>
        <BlindDateTitle>오늘의 두근</BlindDateTitle>
        <BlindDateExplain>
          매일 새벽 두시, 새로운 상대방이 소개 됩니다.
          <br />
          <br /> 카드를 뒤집어서 상대방의 프로필을 확인하고
          <br /> 마음에 드는 상대방을 만났을 때는 주저하지 말고
          <br /> 두근! 시그널을 보내보세요. <br />
          <br />
          서로가 두근 시그널을 보냈을 때 <br />
          서로의 카카오톡 아이디가 공유됩니다.
        </BlindDateExplain>
      </WriteContainer>
      <CardContainer>
        <Card onClick={handleClick}>
          {userData && (
            <CardInner isFlipped={isFlipped}>
              <CardFront>
                <Carousel
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false}
                  interval={5000}
                >
                  {user1Image.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`carousel-img-${index}`} />
                    </div>
                  ))}
                </Carousel>
                <NameContainer>{`${userData.name}(${userData.age})`}</NameContainer>
                <TagContainer>
                  <Tag>{userData.addressType}</Tag>
                  <Tag>{userData.departmentType}</Tag>
                </TagContainer>
              </CardFront>
              <CardBack>
                <InformationContainer>
                  <DeptData>{`${userData.departmentType}`}</DeptData>
                  <Name>{`${userData.userId}님은`}</Name>
                  <ExplainUserTag>어떤사람?</ExplainUserTag>
                  <PartContainer>
                    <LeftPart>
                      <OtherData>{`키 : ${userData.height}`}</OtherData>
                      <OtherData>{`체형 : ${userData.bodyType}`}</OtherData>
                      <OtherData>{`성격 1 : ${userData.characterType}`}</OtherData>
                      <OtherData>{`성격 2 : ${userData.emotionType}`}</OtherData>
                    </LeftPart>
                    <RightPart>
                      <OtherData>{`취미 1 : ${userData.hobby1}`}</OtherData>
                      <OtherData>{`취미 2 : ${userData.hobby2}`}</OtherData>
                      <OtherData>{`MBTI : ${userData.mbtiType}`}</OtherData>
                      <OtherData>{`거주지역 : ${userData.addressType}`}</OtherData>
                    </RightPart>
                  </PartContainer>
                </InformationContainer>
              </CardBack>
            </CardInner>
          )}
        </Card>
        <Button onClick={() => handleButtonClick(userData.userId)}>두근</Button>
      </CardContainer>
      <CardContainer>
        <Card onClick={handleSecondCardClick}>
          {userData && (
            <CardInner isFlipped={isSecondCardFlipped}>
              <CardFront>
                <Carousel
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false}
                  interval={5000}
                >
                  {user2Image.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`carousel-img-${index}`} />
                    </div>
                  ))}
                </Carousel>
                <NameContainer>{`${userData.nameSec}(${userData.ageSec})`}</NameContainer>
                <TagContainer>
                  <Tag>{userData.addressTypeSec}</Tag>
                  <Tag>{userData.departmentTypeSec}</Tag>
                </TagContainer>
              </CardFront>
              <CardBack>
                <InformationContainer>
                  <DeptData>{`${userData.departmentTypeSec}`}</DeptData>
                  <Name>{`${userData.userIdSec}님은`}</Name>
                  <ExplainUserTag>어떤사람?</ExplainUserTag>
                  <PartContainer>
                    <LeftPart>
                      <OtherData>{`키 : ${userData.heightSec}`}</OtherData>
                      <OtherData>{`체형 : ${userData.bodyTypeSec}`}</OtherData>
                      <OtherData>{`성격 1 : ${userData.characterTypeSec}`}</OtherData>
                      <OtherData>{`성격 2 : ${userData.emotionTypeSec}`}</OtherData>
                    </LeftPart>
                    <RightPart>
                      <OtherData>{`취미 1 : ${userData.hobby1}`}</OtherData>
                      <OtherData>{`취미 2 : ${userData.hobby2}`}</OtherData>
                      <OtherData>{`MBTI : ${userData.mbtiType}`}</OtherData>
                      <OtherData>{`거주지역 : ${userData.addressType}`}</OtherData>
                    </RightPart>
                  </PartContainer>
                </InformationContainer>
              </CardBack>
            </CardInner>
          )}
        </Card>
        <Button onClick={() => handleButtonClick(userData.userId)}>두근</Button>
      </CardContainer>
      <Modal isOpen={isModalOpen} close={closeModal} />
    </BlindDateWrapper>
  );
};

const PartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;


const ExplainUserTag = styled.div`
  text-align: left;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const LeftPart = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const RightPart = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const BlindDateWrapper = styled.div`
  min-height: 100vh;
  max-width: 65rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: auto;

  @font-face {
    font-family: "GmarketSansTTFBold";
    src: local("GmarketSansTTFBold"), local("GmarketSansTTFBold");
    font-style: normal;
    src: url(${GmarketSansTTFBold}) format("truetype");
  }
`;

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 220px;
`;

const BlindDateTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
`;

const BlindDateExplain = styled.p`
  font-size: 1.1rem;
  margin-top: 25px;
  font-weight: 700;
  color: #717171;
`;
const Card = styled.div`
  margin-top: 180px;
  width: 330px;
  height: 450px;
  perspective: 1500px; // 3D 효과를 더 강화하기 위해 perspective 값을 늘립니다.
  transition: transform 0.5s;
  transform-style: preserve-3d;
  border-radius: 30px;

  img {
    width: 300px;
    height: 420px;
    border-radius: 20px;
    object-fit: cover;
  }
  &:hover {
    transform: scale(
      1.05
    ); 
  }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-weight: 300;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;

  ${({ isFlipped }) =>
    isFlipped &&
    css`
      transform: rotateY(180deg);
    `}
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden; // Add this line
`;

const CardFront = styled(CardFace)`
  padding-bottom: 20px;
  background-color: #f2f2f2;
  color: black;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  img {
    position: relative;
    z-index: 1;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, transparent 80%);
    z-index: 2;
  }
  overflow: hidden; // Add this line
`;

const CardBack = styled(CardFace)`
  background-color: #f5f5f5;
  color: #252525;
  transform: rotateY(180deg);
  overflow: hidden; // Add this line
`;

const NameContainer = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  position: absolute;
  bottom: 70px;
  left: 20px;
  color: white;
  z-index: 3;
`;

const TagContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 3;
`;

const Tag = styled.div`
  border: none;
  border-radius: 3px;
  padding: 6px 15px;
  background-color: #ff2556;
  color: white;
  font-size: 1rem;
`;

const InformationContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DeptData = styled.p`
  font-weight: 600;
  text-align: center;
  border: 1px solid pink;
  border-radius: 6px;
  background-color: #ff4572;
  width: 100px;
  margin-left: 10px;
  color: white;
`;

const OtherData = styled.div`
  font-weight: 500;
  margin: 10px;
  text-align: left;
`;

const Name = styled.h2`
  text-align: left;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #ff4572;
  color: white;
  padding: 10px 20px;
  border-radius: 15px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover {
    background-color: #565656;
    animation: heartbeat 0.5s infinite;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${props => (props.isOpen ? "block" : "none")};
`;

const ModalContainer = styled.div`
  width: 400px;
  background: #f9f9f9;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);

`;
const ModalContent = styled.div`
  padding-bottom: 25px;
  padding-top: 10px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  border: none;
  background-color: #ff2559;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  color: #fff;
  font-weight: 700;
`
export default BlindDateView;
