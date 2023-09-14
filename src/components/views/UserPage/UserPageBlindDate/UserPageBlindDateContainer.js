import React, { useEffect, useState } from 'react'
import UserPageBlindDateView from './UserPageBlindDateView'
import axios from 'axios';
import { getJWTCookie } from '../../../Api/loginApi';
import { useNavigate } from 'react-router-dom';

const UserPageBlindDateContainer = () => {
    const [toLikeUser, setToLikeUser] = useState([]);
    const [fromLikeUser, setFromLikeUser] = useState([]);
    const [matchUser, setMatchUser] = useState([])
    const [selectedUserId, setSelectedUserId] = useState(null); // Track the selected user for chatting
    const [roomId, setRoomId] = useState(null);

    const userId = getJWTCookie("userId");
    const authToken = getJWTCookie("jwtAccessToken");

    const getBlindDateToLike = async () => {
        const response = await axios
          .get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/blindDate/toLike`, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .then((res) => {
            setToLikeUser(res.data);
            console.log(setToLikeUser);
        })
          .catch((err) => {
            console.log("내가 호감표시한 유저들 에러 :", err);
          });
    
        return response;
      };

      const getBlindDatefromLike = async () => {
        const response = await axios
          .get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/blindDate/fromLike`, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
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
          .get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/finalMatches`, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
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

      const handleChating = async (targetUserId) => {
        await axios
        .post(
          `http://${process.env.REACT_APP_SERVER_IP}/finalMatch/personalChat`,
          {
            userId: userId,
            anotherUserId: targetUserId
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .then((res)=> {
          console.log(res.data);
          setSelectedUserId(targetUserId);
          setRoomId(res.data.chatRoomId);
        })
        .catch((err) => {
          console.log(err);
        })
      };

      useEffect(() => {
        getBlindDateToLike();
        getBlindDatefromLike();
        getBlindDateMatches();
      }, [])

  return (
    <UserPageBlindDateView toLikeUser={toLikeUser} fromLikeUser={fromLikeUser} matchUser={matchUser} handleDooeun={handleDooeun} handleChating={handleChating} selectedUserId={selectedUserId} roomId={roomId} userId={userId}/>
    )
}

export default UserPageBlindDateContainer