import React from 'react';
import FindPasswordView from './FindPasswordView';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindPasswordContainer = () => {
  // 1. 이메일 -> 이메일로 임시번호 발송
  // 근데 이메일인지 아닌지도 확인해야되나?
  // 2. 비밀번호는 임시번호로 바뀜

  const navigator = useNavigate();
  const url = 'http://localhost:8080/find-password';
  const submitEmail = async () => {
    try {
      // await axios.get(url, {
      //   // request body 해당
      // }).then(()=>{
      //   navigator('/');
      // })

      // 요청 후 홈페이지로
      navigator('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FindPasswordView submitEmail={submitEmail}></FindPasswordView>
    </>
  );
};

export default FindPasswordContainer;
