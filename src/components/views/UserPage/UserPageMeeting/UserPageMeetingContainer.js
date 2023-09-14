import React, { useState, useEffect } from 'react'
import UserPageMeetingView from './UserPageMeetingView'
import axios from 'axios'
import { getJWTCookie } from '../../../Api/loginApi'

const UserPageMeetingContainer = () => {
    const authToken = getJWTCookie('jwtAuthToken');
    const handleChating = async (targetUserId) => {
        await axios
        .get(
          `http://${process.env.REACT_APP_SERVER_IP}/group`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .then((res)=> {
            console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      };
    
      useEffect(() => {
        handleChating();
      }, [])


  return (
    <UserPageMeetingView/>
    )
}

export default UserPageMeetingContainer