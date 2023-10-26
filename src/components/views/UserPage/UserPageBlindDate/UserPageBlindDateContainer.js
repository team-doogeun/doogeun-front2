import React, { useEffect, useState } from "react";
import UserPageBlindDateView from "./UserPageBlindDateView";
import axios from "axios";
import { getJWTCookie } from "../../../Api/loginApi";
import { useNavigate } from "react-router-dom";

const UserPageBlindDateContainer = () => {
  const [toLikeUser, setToLikeUser] = useState([]);
  const [fromLikeUser, setFromLikeUser] = useState([]);
  const [matchUser, setMatchUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [chatList, setChatList] = useState([]);
  const [userIdInfo, setUserIdInfo] = useState({});

  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie("jwtAccessToken");

  const getBlindDateToLike = async () => {
    const response = await axios
      .get(
        `http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/blindDate/toLike`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        setToLikeUser(res.data);
      })
      .catch((err) => {
        console.log("내가 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  const getBlindDatefromLike = async () => {
    const response = await axios
      .get(
        `http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/blindDate/fromLike`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        setFromLikeUser(res.data);
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });

    return response;
  };

  const getBlindDateMatches = async () => {
    const response = await axios
      .get(
        `http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/finalMatches`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        setMatchUser(res.data);
      })
      .catch((err) => {
        console.log("매칭 유저들 에러 :", err);
      });

    return response;
  };

  const handleDooeun = async (targetUserId) => {
    await axios
      .post(
        `http://${process.env.REACT_APP_SERVER_IP}/mypage/blindDate/fromLike/like`,
        {
          userId: userId,
          targetUserId: targetUserId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        console.log(`${userId} -> ${targetUserId}`);
        return res;
      })
      .catch((err) => {
        console.log("내게 호감표시한 유저들 에러 :", err);
      });
  };

  const handleInfo = async (targetUserId) => {
    await axios
      .get(
        `http://${process.env.REACT_APP_SERVER_IP}/likeToMe/userDetail?requestUserId=${userId}&targetUserId=${targetUserId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        console.log(res);
        setUserIdInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChating = async (targetUserId) => {
    try {
      const res = await axios.post(
        `http://${process.env.REACT_APP_SERVER_IP}/chatStart`,
        {
          userId: userId,
          anotherUserId: targetUserId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setSelectedUserId(targetUserId);
      const newRoomId = res.data.roomId;
      setRoomId(newRoomId);

      const chatInfoResponse = await axios.get(
        `http://${process.env.REACT_APP_SERVER_IP}/chatInfo?roomId=${newRoomId}&userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setChatList(chatInfoResponse.data.chatMessageList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlindDateToLike();
    getBlindDatefromLike();
    getBlindDateMatches();
  }, []);

  return (
    <UserPageBlindDateView
      toLikeUser={toLikeUser}
      fromLikeUser={fromLikeUser}
      matchUser={matchUser}
      handleDooeun={handleDooeun}
      handleChating={handleChating}
      selectedUserId={selectedUserId}
      chatList={chatList}
      roomId={roomId}
      userId={userId}
      handleInfo={handleInfo}
      userIdInfo={userIdInfo}
    />
  );
};

export default UserPageBlindDateContainer;
