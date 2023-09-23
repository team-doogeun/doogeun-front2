import React, { useState, useEffect } from 'react'
import UserPageMeetingView from './UserPageMeetingView'
import axios from 'axios'
import { getJWTCookie } from '../../../Api/loginApi'

const UserPageMeetingContainer = () => {
    const authToken = getJWTCookie("jwtAccessToken");
    const userId = getJWTCookie('userId');

    const [myMeetingRoom, setMyMeetingRoom] = useState([]);
    const [enteringMeetingRoom, setEnteringMeetingRoom] = useState([]);
    const [achieveMeetingRoom, setAchieveMeetingRoom] = useState([])

    const MyMeetingRoom = async () => {
      await axios
        .get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/group/${userId}/my-rooms`,{
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          setMyMeetingRoom(res.data);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const MyEnteringRoom = async () => {
      await axios
        .get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/group/${userId}/entering`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          setEnteringMeetingRoom(res.data);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const AchieveMeetingRoom = async () => {
      await axios
        .get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/group/${userId}/achieve`,{
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          setAchieveMeetingRoom(res.data);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      MyMeetingRoom();
      MyEnteringRoom();
      AchieveMeetingRoom();
    }, [])
  return (
    <UserPageMeetingView myMeetingRoom={myMeetingRoom} enteringMeetingRoom={enteringMeetingRoom} achieveMeetingRoom={achieveMeetingRoom}/>
    )
}

export default UserPageMeetingContainer