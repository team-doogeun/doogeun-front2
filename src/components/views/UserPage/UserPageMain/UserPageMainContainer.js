import React, { useState, useEffect } from "react";
import UserPageMainView from "./UserPageMainView";
import axios from "axios";
import { getJWTCookie, clearAllCookies } from "../../../Api/loginApi";
import { useNavigate } from "react-router-dom";

const UserPageMainContainer = () => {
  const [userInfo, setUserInfo] = useState({});
  const [idealInfo, setIdealInfo] = useState({});
  const userId = getJWTCookie("userId");
  const authToken = getJWTCookie("jwtAccessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/profile`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setUserInfo(res.data);
        console.log(res.data.idealTypeProfile);
        setIdealInfo(res.data.idealTypeProfile);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId, authToken]);

  const changePassword = async (newPassword) => {
    const userId = getJWTCookie("userId");

    await axios
      .post(
        `http://${process.env.REACT_APP_SERVER_IP}/mypage/${userId}/passwordUpdate`,
        {
          newPassword: newPassword,
        }
      )
      .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
        localStorage.clear();
        clearAllCookies();
        navigate("/");
      })
      .catch((error) => {
        console.log("비밀번호를 변경하지 못했습니다");
        alert("비밀번호를 변경하지 못했습니다. 에러는 : " + error + "입니다");
      });
  };

  return (
    <UserPageMainView
      userInfo={userInfo}
      idealInfo={idealInfo}
      changePassword={changePassword}
    />
  );
};

export default UserPageMainContainer;
