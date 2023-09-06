import React, { useState, useEffect } from "react";
import UserSettingsView from "./UserSettingsView";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getJWTCookie, removeJWTCookie } from "../../../Api/loginApi";
import { clearAllCookies } from "../../../Api/loginApi";

const passwordContext = new React.createContext();

const UserSettingContainer = () => {
  const navigate = useNavigate();
  

  const changePassword = async (newPassword) => {
    const userId = getJWTCookie("userId");

    await axios
      .post(`http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/passwordUpdate`, {
        newPassword: newPassword,
      })
      .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
        clearAllCookies();
        navigate("/");
      })
      .catch((error) => {
        console.log("비밀번호를 변경하지 못했습니다");
        alert("비밀번호를 변경하지 못했습니다. 에러는 : " + error + "입니다");
      });
  };


  return (
    <UserSettingsView
      changePassword={changePassword}
    />
  );
};

export { UserSettingContainer as default, passwordContext };
