import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getJWTCookie } from '../../../Api/loginApi';
import MypageSidemenuView from './MyPageSidemenuView';

const MypageSidemenuContainer = (props) => {
  const navigate = useNavigate();
  const userId = getJWTCookie('userId');

  const onUserSettingClick = () => {
    navigate('/my-page');
  };

  const onBlindDateSetting = () => {
    navigate('/my-page/blindDate');
  };

  const onMeetingSetting = () => {
    navigate('/my-page/meeting');
  };

  return (
    <MypageSidemenuView
      currentMenu={props.currentMenu}
      onUserSettingClick={onUserSettingClick}
      onMeetingSetting={onMeetingSetting}
      onBlindDateSetting={onBlindDateSetting}
    />
  );
};

export default MypageSidemenuContainer;
