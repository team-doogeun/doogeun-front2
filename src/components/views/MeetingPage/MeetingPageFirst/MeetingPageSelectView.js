import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BottomImage from '../../../../Img/Rectangle 2.png';
import Pagination from '../../../Pagination/Pagination';
import axios from 'axios';
import { getCookieValue, getJWTCookie } from '../../../Api/loginApi';
import Modal from '../../../Modal/LoginModal';
import RoomDataContainer from '../MeetingRoomData/RoomDataContainer';

const MeetingPageSelectView = ({
  meetings,
  registerIn,
  checkRoomData,
  alreadyStart,
}) => {
  // meetingRoom Control
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [createRoom, setCreateRoom] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomIntro, setRoomIntro] = useState('');
  const [roomSize, setRoomSize] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomData, setRoomData] = useState({});

  // title, intro control
  const [titleMsg, setTitleMsg] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [introMsg, setIntroMsg] = useState('');
  const [isIntro, setIsIntro] = useState(false);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  const setRoomDataModal = async (isOpen, roomId) => {
    if (isOpen) {
      const roomData = await checkRoomData(roomId);
      setModalIsOpen(true);
      setRoomData(roomData);
    } else {
      setModalIsOpen(false);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // 보여줄 페이지 갯수
  const meetingsToShow = meetings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateRoom = async () => {
    const userId = getJWTCookie('userId');
    const authToken = getJWTCookie('jwtAccessToken');

    const newRoom = {
      title: roomTitle,
      capacityMale: roomSize,
      capacityFemale: roomSize,
      groupBlindIntroduction: roomIntro,
    };

    try {
      const response = await axios
        .post(`http://${process.env.REACT_APP_SERVER_IP}/group/${userId}/new`, newRoom, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          console.log('서버에 저장 후 방 데이터 불러오기 성공');
          return res;
        })
        .catch((err) => {
          console.log(err);
        });

      const newMeetingRoom = response.data;
      setMeetingRooms([...meetingRooms, newMeetingRoom].reverse());
    } catch (error) {
      console.error('Error adding meeting room:', error);
    }

    console.log(meetingRooms);
    setCreateRoom(false);
  };

  const onTitleHandler = (e) => {
    e.preventDefault();
    const nowTitle = e.currentTarget.value;
    setRoomTitle(nowTitle);

    if (nowTitle.length > 20) {
      setTitleMsg('20글자 이내로 입력해주세요.');
      setIsTitle(false);
    } else {
      setTitleMsg('올바른 형식입니다.');
      setIsTitle(true);
    }

    if (nowTitle.length === 0) {
      setTitleMsg('');
      setIsTitle(false);
    }
  };

  const onIntroHandler = (e) => {
    e.preventDefault();
    const nowIntro = e.currentTarget.value;
    setRoomIntro(nowIntro);

    if (nowIntro.length && nowIntro.length > 50) {
      setIntroMsg('50글자 이내로 입력해주세요.');
      setIsIntro(false);
    } else {
      setIntroMsg('올바른 형식입니다.');
      setIsIntro(true);
    }

    if (nowIntro.length === 0) {
      setIntroMsg('');
      setIsIntro(false);
    }
  };

  return (
    <>
      <Banner>
        <img src={BottomImage} />
        <BannerWrapper>
          <BannerTitle>두근두근 미팅</BannerTitle>
          <BannerText>
            <p>
              직접 방을 개설할 수도 있고
              <br />
              다른 미팅방에 참여할 수도 있어요
              <br />
              <br />
              방 인원이 다 차고 호스트가 미팅을 시작하면
              <br />
              카카오톡 아이디가 공유됩니다
              <br />
              <br />
              호스트는 카카오톡에서 다른 유저를 초대해서 만남을 주선해 주세요
            </p>
          </BannerText>
        </BannerWrapper>
      </Banner>
      <MeetingPageSelectWrapper>
        <ContentWrapper>
          <RoomContainer>
            {meetingRooms.length === 0 ? (
              <></>
            ) : (
              meetingRooms.map((room) => (
                <RoomCard key={room.roomId}>
                  <RoomCapacity>{`${room.capacityMale}: ${room.capacityFemale}`}</RoomCapacity>
                  <RoomTitle>{room.title}</RoomTitle>
                  <CheckAndRegisterBlock>
                    <CheckRoomData
                      onClick={() => setRoomDataModal(true, room.roomId)}
                    >
                      상세정보 확인
                    </CheckRoomData>
                    {modalIsOpen && (
                      <Modal
                        CloseModal={() => {
                          setModalIsOpen(!modalIsOpen);
                        }}
                      >
                        {/* roomData 안엔 post쳐서 res 받아온 데이터가 들어가야함 -> 함수 필요*/}
                        <RoomDataContainer
                          roomData={roomData}
                        ></RoomDataContainer>
                      </Modal>
                    )}

                    <RoomRegisterInOut>
                      {room.groupBlindStatus === 'DONE' ? (
                        <AlreadyStartBtn disabled={true}>
                          진행중인 미팅방
                        </AlreadyStartBtn>
                      ) : (
                        <RoomRegisterInBtn
                          onClick={() => {
                            registerIn(room.roomId);
                          }}
                        >
                          참여
                        </RoomRegisterInBtn>
                      )}
                    </RoomRegisterInOut>
                  </CheckAndRegisterBlock>
                </RoomCard>
              ))
            )}
            {meetings.length === 0 ? (
              <RoomCard />
            ) : (
              meetingsToShow.map((room) => (
                <RoomCard key={room.roomId}>
                  <RoomCapacity>{`${room.capacityMale}: ${room.capacityFemale}`}</RoomCapacity>
                  <RoomTitle>{room.title}</RoomTitle>
                  <CheckAndRegisterBlock>
                    <CheckRoomData
                      onClick={() => setRoomDataModal(true, room.roomId)}
                    >
                      상세정보 확인
                    </CheckRoomData>
                    {modalIsOpen && (
                      <Modal
                        CloseModal={() => {
                          setRoomDataModal(!modalIsOpen);
                        }}
                      >
                        {/* roomData 안엔 post쳐서 res 받아온 데이터가 들어가야함 -> 함수 필요*/}
                        <RoomDataContainer
                          roomData={roomData}
                        ></RoomDataContainer>
                      </Modal>
                    )}
                    <RoomRegisterInOut>
                      {room.groupBlindStatus === 'DONE' ? (
                        <AlreadyStartBtn disabled={true}>
                          진행중인 미팅방
                        </AlreadyStartBtn>
                      ) : (
                        <RoomRegisterInBtn
                          onClick={() => {
                            registerIn(room.roomId);
                          }}
                        >
                          참여
                        </RoomRegisterInBtn>
                      )}
                    </RoomRegisterInOut>
                  </CheckAndRegisterBlock>
                </RoomCard>
              ))
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </RoomContainer>

          <CreateRoomWrapper>
            <RoomSettingContainer>
              <StyledTitle>방 만들기</StyledTitle>
              <InputWrapper>
                <StyledLabel>방 제목 (20자 내)</StyledLabel>
                <StyledInput
                  type="text"
                  value={roomTitle}
                  onChange={onTitleHandler}
                />
                {roomTitle.length < 20 ? (
                  <OkMsg>{titleMsg}</OkMsg>
                ) : (
                  <NoMsg>{titleMsg}</NoMsg>
                )}
                <StyledLabel>방 소개글 (50자 내)</StyledLabel>
                <StyledInput
                  type="text"
                  value={roomIntro}
                  onChange={onIntroHandler}
                />
                {roomIntro.length < 50 ? (
                  <OkMsg>{introMsg}</OkMsg>
                ) : (
                  <NoMsg>{introMsg}</NoMsg>
                )}
              </InputWrapper>
              <SelectWrapper>
                <StyledLabel>인원 수</StyledLabel>

                <ButtonWrapper>
                  <RoomSizeButton
                    selected={roomSize === 2}
                    onClick={() => setRoomSize(2)}
                  >
                    2대2
                  </RoomSizeButton>
                  <RoomSizeButton
                    selected={roomSize === 3}
                    onClick={() => setRoomSize(3)}
                  >
                    3대3
                  </RoomSizeButton>
                  <RoomSizeButton
                    selected={roomSize === 4}
                    onClick={() => setRoomSize(4)}
                  >
                    4대4
                  </RoomSizeButton>
                </ButtonWrapper>
              </SelectWrapper>
            </RoomSettingContainer>
            <ButtonWrapper>
              <MakeRoomButton onClick={handleCreateRoom}>
                방 만들기
              </MakeRoomButton>
            </ButtonWrapper>
          </CreateRoomWrapper>
        </ContentWrapper>
      </MeetingPageSelectWrapper>
    </>
  );
};

const MeetingPageSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 50px;
  background: #f5f5f5;
`;

const EmptyRoom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1040px;
  text-align: center;
  gap: 30px;
  margin-bottom: 100px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1040px;
  text-align: center;
  gap: 30px;
  margin-bottom: 100px;
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 50px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 1rem 2rem;
  width: 280px;
  height: 50px;
  font-weight: 700;
  color: white;
  transition: transform 0.3s ease-in-out;
  background-color: #ff2559;
`;

const CheckAndRegisterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 15px;
  padding-top: 5px;
`;

// 참여 / 나가기
const RoomRegisterInOut = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 15px;
`;

const RegisterAlreadyButton = `
  border: 1px solid #ff4572;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  color: white;
  background: transparent;
  padding: 0.3rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: #ff4572;

  &:hover {
    transform: scale(1.05);
  }
`;

const RoomRegisterInBtn = styled.button`
  ${RegisterAlreadyButton}
  width: 65px;
`;

const AlreadyStartBtn = styled.button`
  ${RegisterAlreadyButton}
  width: 150px;
`;

const RoomCapacity = styled.div`
  color: #ff4572;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: white;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 12px;
  width: 60px;
  text-align: left;
`;

const MakeRoomButton = styled(StyledButton)``;

const RoomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

const RoomCard = styled.div`
  width: 650px;
  height: 130px;
  border: 1px solid #d5d5d5;
  border-radius: 15px;
  background-color: #fff;
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

const CreateRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 33%;
  min-height: 460px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #d5d5d5;
`;

const RoomSettingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const SelectWrapper = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputWrapper = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 2px;
`;

const OkMsg = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: green;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const NoMsg = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const RoomSizeButton = styled.button`
  width: 100px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#ff2559' : 'white')};
  color: ${(props) => (props.selected ? '#fff' : '#252525')};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const RoomTitle = styled.h2`
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: left;
  width: 100%;
  margin-left: 20px;
  max-height: 40px;
`;

const CheckRoomData = styled.button`
  font-size: 14px;
  font-weight: 700;
  border: none;
  background-color: white;
  color: gray;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    color: #ff4572;
  }
`;

const Banner = styled.div`
  display: flex;
  position: relative;
  height: 300px;
  h1 {
    position: absolute;
  }
  img {
    width: 100%;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const BannerTitle = styled.h1`
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
`;

export default MeetingPageSelectView;
