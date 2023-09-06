import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileView from './ProfileView';
import axios from 'axios';
import { getJWTCookie, clearAllCookies } from '../../Api/loginApi';

const ProfileContainer = ({ profileImageUrl }) => {
  const navigator = useNavigate();
  const userName = getJWTCookie('name');

  // 로그아웃 url은?
  const logoutHandler = async () => {
    clearAllCookies();
    window.location.reload();
  };

  return (
    <ProfileView
      logoutHandler={logoutHandler}
      userName={userName}
      navigator={navigator}
      profileImageUrl={profileImageUrl}
    />
  );
};

export default ProfileContainer;
