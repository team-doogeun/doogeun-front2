import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FirstPage = () => {
  const [uniName, setUniName] = useState("");
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [code, setCode] = useState(Array(4).fill(''));

  const navigator = useNavigate();

  const handleCodeInput = (e, index) => {
    const value = e.target.value;

    if (value && !isNaN(value)) {
        let newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        const nextInput = document.getElementById(`code${index + 1}`);
        if (nextInput) {
            nextInput.focus();
        }
    }
};

  const emailVerification = async () => {
      try {
        const res = await axios.post(`http://${process.env.REACT_APP_SERVER_IP}/users/api/sendEmail`, {
          email: email,
          uniName: uniName,
        });
        console.log(res);
        localStorage.setItem('email', email);
        localStorage.setItem('uniName', uniName);
        setShowVerificationInput(true);

      } catch (e) {
        alert("이미 가입된 이메일입니다.");
        
      }
  };

  const onClickVerification = async () => {
    const combinedCode = Number(code.join(''));  // 배열을 문자열로 합친 후 숫자로 변환합니다.

    try{
      await axios.post(`http://${process.env.REACT_APP_SERVER_IP}/users/api/code`, {
        code: combinedCode
      }).then((res) => {
        alert("인증 성공!");
        navigator("/myprofile")
      }).catch((e) => {
        alert("인증 실패");
      })
    }
    catch (e) {
      console.log("error");
    }
  }

    const handleUniName = (e) => {
        setUniName(e.target.value);
    }

    const handleEmail = (e) => {
      const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const nowEmail = e.currentTarget.value;
      setEmail(nowEmail);
  
      if (!emailRegex.test(nowEmail)) {
        setEmailMsg('이메일 형식이 틀렸어요! 다시 확인해주세요.');
      } else {
        setEmailMsg('올바른 이메일 형식이에요:)');
        localStorage.setItem('email', nowEmail);
      }
    }

    const onClickButton = () => {
      if(uniName && email) {
          emailVerification();
      }
      else {
        alert("입력을 완료해주세요.");
      }
    }

  return (
    <>
        <FirstPageContainer>
        <InputWrapper>
            <Title>대학교 인증</Title>

            {showVerificationInput ? (
                    <>
                    <VerificationWrapper>
                        {[...Array(4)].map((_, index) => (
                            <VerificationInput
                            key={index}
                            id={`code${index}`}
                            maxLength="1"
                            value={code[index] || ''} 
                            onChange={(e) => handleCodeInput(e, index)}
                        />
                        ))}
                    </VerificationWrapper>
                    <Button onClick={onClickVerification}>인증번호 확인</Button>
                    </>

                ) : (
                <>
                  <Input placeholder='ex) 두근대학교' onChange={handleUniName}/>
                  <Input placeholder='ex) 두근@doogeun.ac.kr' onChange={handleEmail}/>
                  {email.length > 0 && (
                    <div style={{color: "red", textAlign:'center'}}>
                      {emailMsg}
                    </div>
                  )}
                  <Button onClick={onClickButton}>인증번호 받기</Button>
                </>
                )}
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
    padding-top: 15rem;
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

const Title = styled.h2`
font-family: "NanumSquareRoundExtraBold";
text-align: center;
`
const VerificationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 340px;
  margin-top: 20px;
`;

const VerificationInput = styled.input`
  width: 60px;
  height: 60px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #dee2e6;
  border-radius: 10px;
`;

export default FirstPage;
