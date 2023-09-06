import React, { useState } from "react";
import axios from "axios";
import BlindDateView from "./BilndDateView";
import { getJWTCookie } from "../../Api/loginApi";

const BlindDateContainer = () => {
  // 좋아요 누르기
  const buttonLike = async (targetUserId) => {
    const userId = getJWTCookie("userId");
    const authToken = getJWTCookie("jwtAccessToken");
    const ServerIp = process.env.REACT_APP_SERVER_IP;

    await axios
      .post(
        `http://${ServerIp}/blindDate/like`,
        {
          userId: userId,
          targetUserId: targetUserId,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then(() => {
        console.log(userId + "가 " + targetUserId + "에게 두근을 보냈습니다");
      });
  };

  const getUserData = async () => {
    const userId = getJWTCookie("userId");
    const authToken = getJWTCookie("jwtAccessToken");

    const response = await axios.get(
      `http://${process.env.REACT_APP_SERVER_IP}/blindDate/${userId}/matches`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    return response.data;
  };

  // 2시에 업데이트
  // setTimeOut : 1번만 실행
  const getDataAtSpecificTime = () => {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setHours(2, 0, 5, 0); // 타겟 시간 설정 (여기서는 2시 0분 5초)

    const timeDifference = targetDate.getTime() - currentDate.getTime();

    let userData = null;
    if (timeDifference > 0) {
      setTimeout(async () => {
        userData = await getUserData();
      }, timeDifference);
    } else {
      // 이미 지난 시간이므로 다음 날로 넘어가기 전에 데이터를 가져옵니다.
      targetDate.setDate(targetDate.getDate() + 1);
      const nextDayTimeDifference =
        targetDate.getTime() - currentDate.getTime();
      setTimeout(async () => {
        userData = await getUserData();
      }, nextDayTimeDifference);
    }
  };

  return (
    <BlindDateView
      getUserData={getUserData}
      buttonLike={buttonLike}
      getDataAtSpecificTime={getDataAtSpecificTime}
    />
  );
};

export default BlindDateContainer;
