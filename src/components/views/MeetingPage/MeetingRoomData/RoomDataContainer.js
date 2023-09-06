import React from "react";
import RoomDataView from "./RoomDataView";
import axios from "axios";
import { getJWTCookie } from "../../../Api/loginApi";
import { useNavigate } from "react-router-dom";

const RoomDataContainer = ({ roomData }) => {
  const navigator = useNavigate();
  const authToken = getJWTCookie("jwtAccessToken");

  // userId
  const hostStart = async (roomId) => {
    await axios
      .post(
        `http://${process.env.REACT_APP_SERVER_IP}/group/${roomId}/achieve`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        alert("호스트가 미팅 시작하였습니다. 마이페이지 : ");
        window.location.reload();
      })
      .catch((error) => {
        console.log("방 시작하기 실패 " + error);
      });
  };

  const deleteRoom = async (roomId) => {
    await axios
      .post(
        `http://${process.env.REACT_APP_SERVER_IP}/group/${roomId}/delete`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        console.log("방 삭제함");
        alert("호스트가 방 삭제하였습니다.");
        window.location.reload();
        return res.data;
      })
      .catch((error) => {
        console.log("방 삭제 실패 " + error);
      });
  };

  return (
    <>
      <RoomDataView
        roomData={roomData}
        hostStart={hostStart}
        deleteRoom={deleteRoom}
      ></RoomDataView>
    </>
  );
};

export default RoomDataContainer;
