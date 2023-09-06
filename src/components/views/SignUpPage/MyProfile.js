import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './MyProfile.css';
import { ageData } from './AttributeData';
import ModalComponent from '../SmallComponent/ModalComponent';
import styled from 'styled-components';

// 회원가입 페이지
function MyProfile(props) {
  const [selectedGender, setSelectedGender] = useState(null);
  // ID
  const [id, setID] = useState('');
  const [idMsg, setIDMsg] = useState('');
  const [isID, setIsID] = useState(false);

  // PW
  const [pw, setPW] = useState('');
  const [pwMsg, setPWMsg] = useState('');
  const [isPW, setIsPW] = useState(false);

  // pwConfirm
  const [confirmPW, setConfirmPW] = useState('');
  const [confirmPWMsg, setConfirmPWMsg] = useState('');
  const [isConfirmPW, setIsConfirmPW] = useState(false);

  // 이름 설정
  const [name, setName] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [isName, setIsName] = useState(false);

  // 성별 : 배열로 관리(필터링 필요)
  const [gender, setGender] = useState([]);
  const [isGender, setIsGender] = useState(false);

  // 나이(dropdown)
  // 드롭다운 기능 : 다른 곳 클릭했을 시 자동으로 사라짐
  const [age, setAge] = useState(null);
  const [isAge, setIsAge] = useState(false);

  // email(@konkuk.ac.kr 필수입력)
  const [email, setEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  // studentID
  const [studentID, setStudentID] = useState('');
  const [studentIDMsg, setStudentIDMsg] = useState('');
  const [isStudentID, setIsStudentID] = useState(false);

  // kakaoID
  const [kakaoID, setKakaoID] = useState('');
  const [kakaoIDMsg, setKakaoMSg] = useState('');
  const [isKakaoID, setIsKakaoID] = useState(false);

  const [uniName, setUniName] = useState('');
  const [description, setDescription] = useState('');

  // 유효성 검사
  // 다음페이지로 넘어가기 위해
  // 정보를 다 입력했는지?
  const [pageValid, setPageValid] = useState(false);

  useEffect(() => {
    setPageValid(
      isID &&
        isPW &&
        isConfirmPW &&
        isName &&
        isEmail &&
        isStudentID &&
        isKakaoID
    );
  }, [
    isID,
    isPW,
    isConfirmPW,
    isName,
    isGender,
    isAge,
    isEmail,
    isStudentID,
    isKakaoID,
  ]);

  // 입력함수
  const onIDHandler = (e) => {
    const nowID = e.currentTarget.value;
    setID(nowID);

    if (nowID.length < 5) {
      setIDMsg('5글자 이상 입력해주세요.');
      setIsID(false);
      localStorage.setItem('id', '');
    } else {
      setIDMsg('올바른 형식입니다.');
      setIsID(true);
      localStorage.setItem('id', nowID);
    }
  };

  const onPWHandler = (e) => {
    // Regex : 입력규칙 -> 숫자+영문자+특수문자 조합으로 8자리 이상
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const nowPW = e.currentTarget.value;
    setPW(nowPW);

    if (pwRegex.test(nowPW)) {
      setPWMsg('안전한 비밀번호에요.');
      setIsPW(true);
      localStorage.setItem('pw', nowPW);
    } else {
      setPWMsg('숫자+영문자+특수문자 조합으로 8자리 이상!');
      setIsPW(false);
      localStorage.setItem('pw', '');
    }
  };

  const onConfirmPWHandler = (e) => {
    const nowPWConfirm = e.currentTarget.value;
    setConfirmPW(nowPWConfirm);

    if (pw === nowPWConfirm) {
      setConfirmPWMsg('똑같은 비밀번호입니다.');
      setIsConfirmPW(true);
      localStorage.setItem('confirmPW', nowPWConfirm);
    } else {
      setConfirmPWMsg('비밀번호가 다릅니다!');
      setIsConfirmPW(false);
      localStorage.setItem('confirmPW', '');
    }
  };

  const onAgeHandler = (selectedOption) => {
    setAge(selectedOption);
    setIsAge(true);
    localStorage.setItem('age', selectedOption.value);
  };

  const onGenderHandler = (gender) => {
    setSelectedGender(gender);
    localStorage.setItem('gender', gender);
  }

  // 비밀번호 같은지 재검사
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pw === confirmPW) {
        setIsConfirmPW(true);
        setConfirmPWMsg('똑같은 비밀번호입니다.');
        localStorage.setItem('confirmPW', confirmPW);
      } else {
        setIsConfirmPW(false);
        setConfirmPWMsg('비밀번호가 다릅니다!');
        localStorage.setItem('confirmPW', '');
      }
    }, 500); // 0.5초마다 실행

    // 한 번 실행하고 clear 해준다. 즉, 재실행 x
    return () => clearInterval(intervalId);
  }, [pw, confirmPW]);

  const onNameHandler = (e) => {
    const nowName = e.currentTarget.value;
    setName(nowName);

    if (nowName.length < 2 || nowName.length > 10) {
      setNameMsg('2글자 이상 10글자 미만으로 입력해주세요.');
      setIsName(false);
      localStorage.setItem('name', '');
    } else {
      setNameMsg('올바른 형식입니다.');
      setIsName(true);
      localStorage.setItem('name', nowName);
    }
  };

  const onEmailHandler = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const nowEmail = e.currentTarget.value;
    setEmail(nowEmail);

    if (!emailRegex.test(nowEmail)) {
      setEmailMsg('이메일 형식이 틀렸어요! 다시 확인해주세요.');
      setIsEmail(false);
      localStorage.setItem('email', '');
    } else {
      setEmailMsg('올바른 이메일 형식이에요:)');
      setIsEmail(true);
      localStorage.setItem('email', nowEmail);
    }
  };

  const onStudentIDHandler = (e) => {
    const nowStudentID = e.currentTarget.value;
    setStudentID(nowStudentID);
    const shortID = nowStudentID.substr(2, 2);
    const isNum = nowStudentID.substr(nowStudentID.length - 1, 1);

    if (nowStudentID.length !== 9) {
      setStudentIDMsg('학번은 9자리입니다!');
      setIsStudentID(false);
      localStorage.setItem('studentID', '');
    } else {
      setStudentIDMsg(`${shortID}학번이시네요 반갑습니다!`);
      setIsStudentID(true);
      localStorage.setItem('studentID', nowStudentID);
    }

    if (isNaN(isNum)) {
      setStudentIDMsg('숫자만 입력해주세요.');
      setIsStudentID(false);
      localStorage.setItem('studentID', '');
    }
  };

  const onKakaoIDHandler = (e) => {
    const nowKakaoID = e.currentTarget.value;
    setKakaoID(nowKakaoID);
    setKakaoMSg('매칭시 교환되는 아이디입니다.\n신중하게 입력해주세요.');
    setIsKakaoID(true);
    localStorage.setItem('kakaoID', nowKakaoID);
  };

  const onUniNameHandler = (e) => {
    const nowUniName = e.currentTarget.value;
    setUniName(nowUniName);
    localStorage.setItem('uniName', nowUniName);
  };

  const onDescriptionHandler = (e) => {
    const nowDescription = e.currentTarget.value;
    setDescription(nowDescription);
    localStorage.setItem('description', nowDescription);
  };

  const customStyle = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    control: (provided, state) => ({
      ...provided,
      width: '400px', // 원하는 너비 값으로 변경
      height: '55px', // 원하는 높이 값으로 변경
      borderRadius: '10px',
      paddingLeft: '10px',
    }),
  };

  return (
    <div className="MyProfilePage" id="MyProfile">
      <div className="MyProfileForm">
        <div className="MyProfileInputs">
          <Input
            onChange={onIDHandler}
            placeholder="아이디"
            value={id}
            type="text"
          ></Input>
          {id.length > 0 && (
            <div className={`message ${isID ? 'success' : 'error'}`}>
              {idMsg}
            </div>
          )}

          <Input
            onChange={onPWHandler}
            placeholder="비밀번호"
            value={pw}
            type="password"
          ></Input>
          {pw.length > 0 && (
            <div className={`message ${isPW ? 'success' : 'error'}`}>
              {pwMsg}
            </div>
          )}

          <Input
            onChange={onConfirmPWHandler}
            placeholder="비밀번호 확인"
            value={confirmPW}
            type="password"
            id="confirmPW"
          ></Input>
          {confirmPW.length > 0 && (
            <div className={`message ${isConfirmPW ? 'success' : 'error'}`}>
              {confirmPWMsg}
            </div>
          )}

          <Input
            onChange={onNameHandler}
            placeholder="이름"
            value={name}
            type="text"
          ></Input>
          {name.length > 0 && (
            <div className={`message ${isName ? 'success' : 'error'}`}>
              {nameMsg}
            </div>
          )}
          <GenderAndAge>
          <GenderButtonContainer>
          <GenderButtonMale
            selected={selectedGender === '남'}
            onClick={() => onGenderHandler('남')}
          >
            남성
          </GenderButtonMale>
          <GenderButtonFemale
            selected={selectedGender === '여'}
            onClick={() => onGenderHandler('여')}
          >
            여성
          </GenderButtonFemale>
              </GenderButtonContainer>
              <AgeContainer>
              <Select
            options={ageData}
            value={age}
            onChange={onAgeHandler}
            placeholder="나이를 선택하세요"
            styles={customStyle}
          />
          </AgeContainer>
          </GenderAndAge>
          <Input
            onChange={onEmailHandler}
            type="text"
            placeholder="@konkuk.ac.kr"
            value={email}
          ></Input>
          {email.length > 0 && (
            <div className={`message ${isEmail ? 'success' : 'error'}`}>
              {emailMsg}
            </div>
          )}

          <Input
            onChange={onStudentIDHandler}
            placeholder="학번"
            value={studentID}
            type="text"
          ></Input>
          {studentID.length > 0 && (
            <div className={`message ${isStudentID ? 'success' : 'error'}`}>
              {studentIDMsg}
            </div>
          )}

          <Input
            onChange={onUniNameHandler}
            placeholder="대학교"
            value={uniName}
            type="text"
          ></Input>

          <Input
            onChange={onDescriptionHandler}
            placeholder="자기소개"
            value={description}
            type="text"
          ></Input>

          <Input
            onChange={onKakaoIDHandler}
            placeholder="카카오ID"
            value={kakaoID}
            type="text"
            style={customStyle}
          ></Input>
          {kakaoID.length > 0 && <div className="kakaoIDMsg">{kakaoIDMsg}</div>}

          <ModalComponent
            mainContent="nextPage"
            contentName="다음"
            header="알림"
            nextPage="detailprofile"
            disabled={!pageValid}
          />
        </div>
      </div>
    </div>
  );
}

const Input = styled.input`
  width: 400px;
  height: 60px;
  border-radius: 10px;
  border: 2px solid #dee2e6;
  margin-top: 30px;
  padding-left: 15px;
  ::placeholder {
    color: #a5a5a5;
  }
`;

const GenderAndAge = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
`;


const GenderButtonContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  margin-bottom: 25px;
  margin-top: 20px;
`

const GenderButtonMale = styled.button`
  width: 200px;
  height: 55px;
  background-color: ${props => props.selected ? '#3EAEF4' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#a5a5a5'};
  border: 2px solid #e9e9e9;
  border-right: 1px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
`;

const GenderButtonFemale = styled.button`
  width: 200px;
  height: 55px;
  background-color: ${props => props.selected ? '#E91E63' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#a5a5a5'};
  border: 2px solid #e9e9e9;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
`;

const AgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`

export { MyProfile as default };
