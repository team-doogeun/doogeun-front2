import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FirstPage = () => {
    const [uniName, setUniName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const emailVerification = async (values) => {
    
        try {
          await axios
            .post(`http://${process.env.REACT_APP_SERVER_IP}/users/api/sendEmail`, {
              email: email,
              uniName: uniName,
            })
            .then((res) => {
                console.log(res);
                localStorage.setItem('email', email);
                localStorage.setItem('uniName', uniName);
                navigate('/verification');
            })
            .catch((e) => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }
      };


    const handleUniName = (e) => {
        setUniName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const onClickButton = () => {
        emailVerification();
    }

  return (
    <>
      <FirstPageContainer>
        <InputWrapper>
            <Input placeholder='ex) 두근대학교' onChange={handleUniName}/>
            <Input placeholder='ex) 두근@doogeun.ac.kr' onChange={handleEmail}/>
            <Button onClick={onClickButton}>인증번호 받기</Button>
        </InputWrapper>
      </FirstPageContainer>
    </>
  );
};

const FirstPageContainer = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`

    display: flex;
    flex-direction: column;
    padding-top: 10rem;
`
const Input = styled.input`
  width: 340px;
  height: 55px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  margin-top: 10px;
  padding-left: 15px;
  ::placeholder {
    color: #b5b5b5;
  }
`;
const Button = styled.button`
  font-size: 16px;
  font-weight: 700;
  width: 340px;
  height: 55px;
  border-radius: 10px;
  background-color: #ff426f;
  color: #fff;
  margin-top: 20px;
  border: none;
  cursor: pointer;
`;

export default FirstPage;
