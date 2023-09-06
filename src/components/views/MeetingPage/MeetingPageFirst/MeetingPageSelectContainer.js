import React, { useEffect, useState } from "react";
import MeetingRoomView from "./MeetingPageSelectView";
import axios from "axios";
import { getJWTCookie } from "../../../Api/loginApi";
import { useNavigate } from "react-router-dom";

const MeetingPageSelectContainer = () => {
  const navigator = useNavigate();
  const [meetings, setMeetings] = useState([]);

  // 시작한 미팅방
  const [alreadyStart, setAlreadyStart] = useState(false);

  // Polling : 주기적인 업데이트 느낌
  // 5초마다 미팅방 데이터 로드
  // 근데 데이터가 너무 많아서 fetchMeetings의 실행시간이 5초보다 길면 5초 이후에 실행된다
  // 추후에 수정가능
  useEffect(() => {
    // 처음엔 한번 데이터 로드
    loadMeetings();

    const intervalId = setInterval(loadMeetings, 10000); // 10초마다 데이터 요청

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 폴링 중지
    };
  }, []);

  // userId가 맞으면 그때 데이터 넘어옴
  // 미팅방 목록 생성
  const loadMeetings = async () => {
    try {
      const response = await axios
        .get(`http://${process.env.REACT_APP_SERVER_IP}/group`)
        .then((res) => {
          return res;
        });
      const meetingData = response.data;
      setMeetings(meetingData);
    } catch (error) {
      console.error("Meeting 방 정보 가져오기 실패:", error);
    }
  };

  // 입장 버튼
  const registerIn = async (roomId) => {
    const authToken = getJWTCookie("jwtAccessToken");

    await axios
      .post(
        `http://${process.env.REACT_APP_SERVER_IP}/group/${roomId}`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        alert(`${res.data}`);
        window.location.reload();
      })
      .catch((error) => {
        console.log("방에 입장하는데 에러가 있습니다." + error);
      });
  };

  // 상세정보 확인에서 방 정보 확인
  const checkRoomData = async (roomId) => {
    const authToken = getJWTCookie("jwtAccessToken");

    const response = await axios
      .get(`http://${process.env.REACT_APP_SERVER_IP}/group/${roomId}/info`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err + "미팅방 정보 요청 안됨");
      });

    return response;
  };

  return (
    <MeetingRoomView
      meetings={meetings}
      registerIn={registerIn}
      checkRoomData={checkRoomData}
      alreadyStart={alreadyStart}
    ></MeetingRoomView>
  );
};

export default MeetingPageSelectContainer;
