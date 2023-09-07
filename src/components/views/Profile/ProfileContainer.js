import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileView from './ProfileView';
import axios from 'axios';
import { getJWTCookie, clearAllCookies } from '../../Api/loginApi';

const ProfileContainer = ({ profileImageUrl }) => {
  const navigator = useNavigate();
  const userName = getJWTCookie('name');

  const logoutHandler = async () => {
    clearAllCookies();
    localStorage.clear();
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
