import React, { useState, useEffect } from 'react';
import MypageSidemenuView from './MyPageSidemenuView';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getJWTCookie } from '../../../Api/loginApi';

const MypageSidemenuContainer = (props) => {
  const navigate = useNavigate();

  const onUserSettingClick = () => {
    navigate('/mypage');
  };

  const onBlindDateSetting = () => {
    navigate('/mypage/blindDate');
  };

  const onMeetingSetting = () => {
    navigate('/mypage/meeting');
  };

  const [userInfo, setUserInfo] = useState({});
  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie('jwtAccessToken');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/profile`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUserInfo(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId, authToken]);

  return (
    <MypageSidemenuView
      userInfo={userInfo}
      currentMenu={props.currentMenu}
      onUserSettingClick={onUserSettingClick}
      onMeetingSetting={onMeetingSetting}
      onBlindDateSetting={onBlindDateSetting}
    />
  );
};

export default MypageSidemenuContainer;
