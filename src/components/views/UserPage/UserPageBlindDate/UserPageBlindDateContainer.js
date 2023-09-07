import React, { useEffect, useState } from 'react'
import UserPageBlindDateView from './UserPageBlindDateView'
import axios from 'axios';
import { getJWTCookie } from '../../../Api/loginApi';
import { useNavigate } from 'react-router-dom';

const UserPageBlindDateContainer = () => {
    const [toLikeUser, setToLikeUser] = useState([]);
    const [fromLikeUser, setFromLikeUser] = useState([]);
    const [matchUser, setMatchUser] = useState([])


    const userId = getJWTCookie("userId");
    const authToken = getJWTCookie("jwtAccessToken");

    const getBlindDateToLike = async () => {
        const response = await axios
          .get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/blindDate/toLike`, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .then((res) => {
            console.log(res.data);
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
            console.log(res.data);
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

      useEffect(() => {
        getBlindDateToLike();
        getBlindDatefromLike();
        getBlindDateMatches();
      }, [])

  return (
    <UserPageBlindDateView toLikeUser={toLikeUser} fromLikeUser={fromLikeUser} matchUser={matchUser}/>
    )
}

export default UserPageBlindDateContainer