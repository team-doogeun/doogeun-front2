import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import "./DetailProfile.css";
import {
  ageRangeData,
  bodyTypeData,
  departmentData,
  addressData,
  characterData1,
  characterData2,
  mbtiData,
  drinkData,
  smokeData,
  priorityData,
} from "./AttributeData";
import Select from "react-select";
import ModalComponent from "../SmallComponent/ModalComponent";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const hobbyContext = React.createContext();
const idealHobbyContext = React.createContext();

function DetailProfile() {
  const navigator = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState({
    basicFilePath: null,
    secondFilePath: null,
    thirdFilePath: null,
  });
  const [isFileSelected, setIsFileSelected] = useState(false);

  // 상태관리 변수
  const [height, setHeight] = useState("");
  const [isHeight, setIsHeight] = useState(false);
  const [heightMsg, setHeightMsg] = useState("");

  const [bodyType, setBodyType] = useState(null);
  const [isBodyType, setIsBodyType] = useState(null);

  const [address, setAddress] = useState(null);
  const [isAddress, setIsAddress] = useState(false);

  const [department, setDepartment] = useState(null);
  const [isDepartment, setIsDepartment] = useState(false);

  const [character, setCharacter] = useState([]);
  const [isCharacter1, setIsCharacter1] = useState(false);
  const [isCharacter2, setIsCharacter2] = useState(false);

  const [mbti, setMBTI] = useState(null);
  const [isMBTI, setIsMBTI] = useState(false);

  // isHobby 어떻게 할까
  const [isDetailHobby, setIsDetailHobby] = useState(false);

  const [drink, setDrink] = useState(null);
  const [isDrink, setIsDrink] = useState(false);

  const [smoke, setSmoke] = useState(null);
  const [isSmoke, setIsSmoke] = useState(false);

  // 우선순위
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSelectedOptions, setIsSelectedOptions] = useState(false);
  const [priority, setPriority] = useState([]);

  //--------이상형-------
  const [idealAge, setIdealAge] = useState(null);
  const [isIdealAge, setIsIdealAge] = useState(false);

  const [idealHeight, setIdealHeight] = useState("");
  const [idealHeightMsg, setIdealHeightMsg] = useState("");
  const [isIdealHeight, setIsIdealHeight] = useState(false);

  const [idealBodyType, setIdealBodyType] = useState(null);
  const [isIdealBodyType, setIsIdealBodyType] = useState(false);

  const [idealDepartment, setIdealDepartment] = useState(null);
  const [isIdealDepartment, setIsIdealDepartment] = useState(false);

  const [idealCharacter1, setIdealCharacter1] = useState(null);
  const [isIdealCharacter1, setIsIdealCharacter1] = useState(false);

  const [idealCharacter2, setIdealCharacter2] = useState(null);
  const [isIdealCharacter2, setIsIdealCharacter2] = useState(false);

  const [idealMBTI, setIdealMBTI] = useState(null);
  const [isIdealMBTI, setIsIdealMBTI] = useState(false);

  const [idealHobby, setIdealHobby] = useState([]);
  const [isIdealHobby, setIsIdealHobby] = useState(false);

  const [idealDrink, setIdealDrink] = useState(null);
  const [isIdealDrink, setIsIdealDrink] = useState(false);

  const [idealSmoke, setIdealSmoke] = useState(null);
  const [isIdealSmoke, setIsIdealSmoke] = useState(false);

  const errorCatchHobbyData = (dataName, num) => {
    try {
      const hobbyData = JSON.parse(localStorage.getItem(`${dataName}`));
      let hobby = "";

      if (num === 0) hobby = hobbyData[0];
      if (num === 1) hobby = hobbyData[1];

      return hobby;
    } catch (error) {
      // 예외 발생 시 처리할 코드 작성
      console.error(
        "An error occurred while retrieving detail hobby data:",
        error
      );
      return error;
    }
  };

  const errorCatchPriority = (dataName, num) => {
    try {
      const priorityData = JSON.parse(localStorage.getItem(`${dataName}`));
      let prioirty = "";

      if (num === 0) prioirty = priorityData[0];
      if (num === 1) prioirty = priorityData[1];
      if (num === 2) prioirty = priorityData[2];

      return prioirty;
    } catch (error) {
      // 예외 발생 시 처리할 코드 작성
      console.error("An error occurred while retrieving priority data:", error);
      return error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      userId: localStorage.getItem("id"),
      password: localStorage.getItem("pw"),
      confirmPassword: localStorage.getItem("confirmPW"),
      description: localStorage.getItem("description"),
      name: localStorage.getItem("name"),
      gender: localStorage.getItem("gender"),
      age: Number(localStorage.getItem("age")),
      email: localStorage.getItem("email"),
      studentId: localStorage.getItem("studentID"),
      uniName: localStorage.getItem("uniName"),
      externalId: localStorage.getItem("kakaoID"),
      detailProfile: {
        height: Number(localStorage.getItem("height")),
        bodyType: localStorage.getItem("bodyType"),
        address: localStorage.getItem("address"),
        department: localStorage.getItem("department"),
        firstCharacter: localStorage.getItem("character1"),
        secondCharacter: localStorage.getItem("character2"),
        mbti: localStorage.getItem("mbti"),
        firstHobby: errorCatchHobbyData("detailHobbyData", 0),
        secondHobby: errorCatchHobbyData("detailHobbyData", 1),
        drink: localStorage.getItem("drink"),
        smoke: localStorage.getItem("smoke"),
        firstPriority: errorCatchPriority("priority", 0),
        secondPriority: errorCatchPriority("priority", 1),
        thirdPriority: errorCatchPriority("priority", 2),
      },
      idealTypeProfile: {
        idealAge: idealAge,
        idealHeight: Number(idealHeight),
        idealBodyType: idealBodyType,
        idealDepartment: idealDepartment,
        firstIdealCharacter: idealCharacter1,
        secondIdealCharacter: idealCharacter2,
        idealMbti: idealMBTI,
        firstIdealHobby: errorCatchHobbyData("idealHobbyData", 0),
        secondIdealHobby: errorCatchHobbyData("idealHobbyData", 1),
        idealDrink: idealDrink,
        idealSmoke: idealSmoke,
      },
    };
    console.log(user);
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(user)], { type: "application/json" });
    formData.append("user", blob);

    Object.keys(selectedFiles).forEach((fileId) => {
      if (selectedFiles[fileId]) {
        formData.append(fileId, selectedFiles[fileId]);
      }
    });

    if (!isFileSelected) {
      alert("파일을 추가하세요!");
      return;
    }

    console.log(selectedFiles);
    // console.log(formData.user);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      await axios.post(`http://${process.env.REACT_APP_SERVER_IP}/users/signup`, formData).then((res) => {
        window.localStorage.clear();
        alert("회원가입이 완료되었습니다.");
        navigator("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 입력함수
  const onHeightHandler = (e) => {
    const nowHeight = e.currentTarget.value;
    setHeight(nowHeight);

    if (100 <= nowHeight && nowHeight <= 250) {
      setHeightMsg("올바른 형식입니다.");
      setIsHeight(true);
      localStorage.setItem("height", nowHeight);
    } else {
      setHeightMsg("키는 100cm 이상 250cm 이하로 입력바랍니다.");
      setIsHeight(false);
      localStorage.setItem("height", "");
    }
  };

  const onBodyTypeHandler = (e) => {
    const nowBodyType = e.value;
    setBodyType(nowBodyType);
    setIsBodyType(true);
    localStorage.setItem("bodyType", nowBodyType);
  };

  const onAddressHandler = (e) => {
    const nowAddress = e.value;
    setAddress(nowAddress);
    setIsAddress(true);
    localStorage.setItem("address", nowAddress);
  };

  const onDepartMentHandler = (e) => {
    const nowDepartment = e.value;
    setDepartment(nowDepartment);
    setIsDepartment(true);
    localStorage.setItem("department", nowDepartment);
  };

  const onCharacterHandler1 = (e) => {
    const nowCharacter = e.value;
    setCharacter(e.value);
    setIsCharacter1(true);
    localStorage.setItem("character1", nowCharacter);
  };

  const onCharacterHandler2 = (e) => {
    const nowCharacter = e.value;
    setCharacter(e.value);
    setIsCharacter2(true);
    localStorage.setItem("character2", nowCharacter);
  };

  const onMBTIHandler = (e) => {
    const nowMBTI = e.value;
    setMBTI(nowMBTI);
    setIsMBTI(true);
    localStorage.setItem("mbti", nowMBTI);
  };

  const onDrinkHandler = (e) => {
    const nowDrink = e.value;
    setDrink(nowDrink);
    setIsDrink(true);
    localStorage.setItem("drink", nowDrink);
  };

  const onSmokeHandler = (e) => {
    const nowSmoke = e.value;
    setSmoke(nowSmoke);
    setIsSmoke(true);
    localStorage.setItem("smoke", nowSmoke);
  };

  // 우선순위 결정
  const handleChange = (selected) => {
    if (selected.length <= 3) {
      setSelectedOptions(selected);
      setPriority(selected.map((option) => option.value));
      if (selected.length === 3) setIsSelectedOptions(true);
      else setIsSelectedOptions(false);
    }
  };

  const onIdealAgeHandler = (e) => {
    const nowAge = e.value;
    setIdealAge(nowAge);
    setIsIdealAge(true);
    localStorage.setItem("idealAge", nowAge);
  };

  const onIdealHeightHandler = (e) => {
    const nowIdealHeight = e.currentTarget.value;
    setIdealHeight(nowIdealHeight);

    if (100 <= nowIdealHeight && nowIdealHeight <= 250) {
      setIdealHeightMsg("올바른 형식입니다.");
      setIsIdealHeight(true);
      localStorage.setItem("idealHeight", nowIdealHeight);
    } else {
      setIdealHeightMsg("키는 100cm 이상 250cm 이하로 입력바랍니다.");
      setIsIdealHeight(false);
      localStorage.setItem("idealHeight", "");
    }
  };

  const onIdealBodyTypeHandler = (e) => {
    const nowBodyType = e.value;
    setIdealBodyType(nowBodyType);
    setIsIdealBodyType(true);
    localStorage.setItem("idealBodyType", nowBodyType);
  };

  const onIdealDepartmentHandler = (e) => {
    const nowDepartment = e.value;
    setIdealDepartment(nowDepartment);
    setIsIdealDepartment(true);
    localStorage.setItem("idealDepartment", nowDepartment);
  };

  const onIdealCharacterHandler1 = (e) => {
    const nowCharacter = e.value;
    setIdealCharacter1(nowCharacter);
    setIsIdealCharacter1(true);
    localStorage.setItem("idealCharacter1", nowCharacter);
  };

  const onIdealCharacterHandler2 = (e) => {
    const nowCharacter = e.value;
    setIdealCharacter2(nowCharacter);
    setIsIdealCharacter2(true);
    localStorage.setItem("idealCharacter2", nowCharacter);
  };

  const onIdealMBTIHandler = (e) => {
    const nowMBTI = e.value;
    setIdealMBTI(nowMBTI);
    setIsIdealMBTI(true);
    localStorage.setItem("idealMBTI", nowMBTI);
  };

  const onIdealDrinkHandler = (e) => {
    const nowDrink = e.value;
    setIdealDrink(nowDrink);
    setIsIdealDrink(true);
    localStorage.setItem("idealDrink", nowDrink);
  };

  const onIdealSmokeHandler = (e) => {
    const nowSmoke = e.value;
    setIdealSmoke(nowSmoke);
    setIsIdealSmoke(true);
    localStorage.setItem("idealSmoke", nowSmoke);
  };

  // 우선순위 로컬스토리지 저장 : state 상태 동기화
  // value값만 문자열로 저장시켜주기
  useEffect(() => {
    const priorityValues = selectedOptions.map((option) => option.value);
    localStorage.setItem("priority", JSON.stringify(priorityValues));
  }, [selectedOptions]);

  const handleFileChange = (fileId) => (event) => {
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [fileId]: event.target.files[0],
    }));
    setIsFileSelected(true);
  };

  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      width: "338px", // 원하는 너비 값으로 변경
      height: "55px",
      borderRadius: "10px", // 원하는 높이 값으로 변경
    }),
  };

  return (
    <div className="DetailProfilePage" id="DetailProfile">
      <div className="DetailProfileForm">
        <form className="DetailProfileInputs" onSubmit={handleSubmit}>
          <div className="InputParts">
            <div className="DetailProfilePart">
              <div className="title">상세 프로필 작성</div>
              <Input
                className="height"
                onChange={onHeightHandler}
                value={height}
                type="text"
                placeholder="키 ex) 165"
                autoComplete="off"
                styles={customStyle}
              ></Input>
              {height.length > 0 && (
                <div className={`message ${isHeight ? "success" : "error"}`}>
                  {heightMsg}
                </div>
              )}

              <Select
                className="bodyType"
                placeholder="체형"
                options={bodyTypeData}
                isSearchable={false}
                onChange={onBodyTypeHandler}
                styles={customStyle}
              />

              <Select
                className="address"
                placeholder="주소 : ex) 강남구"
                options={addressData}
                isSearchable={false}
                onChange={onAddressHandler}
                styles={customStyle}
              />

              <Select
                className="department"
                placeholder="대학"
                options={departmentData}
                isSearchable={false}
                onChange={onDepartMentHandler}
                styles={customStyle}
              />

              <Select
                className="character1"
                placeholder="성격1"
                options={characterData1}
                isSearchable={false}
                onChange={onCharacterHandler1}
                styles={customStyle}
              />

              <Select
                className="character2"
                placeholder="성격2"
                options={characterData2}
                isSearchable={false}
                onChange={onCharacterHandler2}
                styles={customStyle}
              />

              <Select
                className="mbti"
                placeholder="mbti"
                options={mbtiData}
                noOptionsMessage={() => {
                  return "없는데용:)";
                }}
                onChange={onMBTIHandler}
                styles={customStyle}
              />

              {/* Context API 사용해서 자식 컴포넌트에서 부모컴포넌트의 데이터를 관리하는 것이 가능 */}
              <hobbyContext.Provider
                value={{ isDetailHobby, setIsDetailHobby }}
              >
                <ModalComponent
                  mainContent="detailHobby"
                  contentName="취미"
                  header="취미"
                  hobbyName="detailHobby"
                />
              </hobbyContext.Provider>

              <Select
                className="drink"
                placeholder="음주"
                options={drinkData}
                isSearchable={false}
                onChange={onDrinkHandler}
                styles={customStyle}
              />

              <Select
                className="smoke"
                placeholder="흡연"
                options={smokeData}
                isSearchable={false}
                onChange={onSmokeHandler}
                styles={customStyle}
              />

              <Select
                className="firstPriority"
                placeholder="우선순위"
                options={priorityData}
                styles={customStyle}
                maxMenuHeight={250}
                isMulti={true}
                closeMenuOnSelect={false}
                onChange={handleChange}
              />
              {priority.length > 0 && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    fontFamily: "priority",
                  }}
                >
                  <div>
                    우선순위는 최대 <span style={{ color: "red" }}>3개</span>
                    까지만 반영이 됩니다.{" "}
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    {priority.map((option, index) => (
                      <div>{`${index + 1}. ${option}`}</div>
                    ))}
                  </div>
                </div>
              )}
              <UploadImage>
                <label htmlFor="file-upload1" className="custom-file-upload">
                  기본 사진 업로드(필수) 1
                </label>
                <input
                  className="imgFile"
                  id="file-upload1"
                  type="file"
                  onChange={handleFileChange("basicFilePath")}
                />
                <p>
                  {selectedFiles.basicFilePath &&
                    `Selected file: ${selectedFiles.basicFilePath.name}`}
                </p>

                <label htmlFor="file-upload2" className="custom-file-upload">
                  사진 업로드 2
                </label>
                <input
                  className="imgFile"
                  id="file-upload2"
                  type="file"
                  onChange={handleFileChange("secondFilePath")}
                />
                <p>
                  {selectedFiles.secondFilePath &&
                    `Selected file: ${selectedFiles.secondFilePath.name}`}
                </p>

                <label htmlFor="file-upload3" className="custom-file-upload">
                  사진 업로드 3
                </label>
                <input
                  className="imgFile"
                  id="file-upload3"
                  type="file"
                  onChange={handleFileChange("thirdFilePath")}
                />
                <p>
                  {selectedFiles.thirdFilePath &&
                    `Selected file: ${selectedFiles.thirdFilePath.name}`}
                </p>
              </UploadImage>
            </div>

            <div className="IdealProfilePart">
              <div className="title">이상형 프로필 작성</div>

              <Input
                className="height"
                placeholder="키 ex) 165"
                value={idealHeight}
                type="text"
                onChange={onIdealHeightHandler}
                styles={customStyle}
              ></Input>
              {idealHeight.length > 0 && (
                <div
                  className={`message ${isIdealHeight ? "success" : "error"}`}
                >
                  {idealHeightMsg}
                </div>
              )}


              <Select
                className="age"
                placeholder="나이"
                options={ageRangeData}
                isSearchable={false}
                isClearable={true}
                onChange={onIdealAgeHandler}
                styles={customStyle}
              />

              

              <Select
                className="bodyType"
                placeholder="체형"
                options={bodyTypeData}
                isSearchable={false}
                isClearable={true}
                onChange={onIdealBodyTypeHandler}
                styles={customStyle}
              />

              <Select
                className="department"
                placeholder="대학"
                options={departmentData}
                isSearchable={false}
                onChange={onIdealDepartmentHandler}
                styles={customStyle}
              />

              <Select
                className="character1"
                placeholder="성격1"
                options={characterData1}
                isSearchable={false}
                onChange={onIdealCharacterHandler1}
                styles={customStyle}
              />

              <Select
                className="character2"
                placeholder="성격2"
                options={characterData2}
                isSearchable={false}
                onChange={onIdealCharacterHandler2}
                styles={customStyle}
              />

              <Select
                className="mbti"
                placeholder="mbti"
                options={mbtiData}
                noOptionsMessage={() => {
                  return "없는데용:)";
                }}
                onChange={onIdealMBTIHandler}
                styles={customStyle}
              />

              <idealHobbyContext.Provider
                value={{ isIdealHobby, setIsIdealHobby }}
              >
                <ModalComponent
                  mainContent="idealHobby"
                  contentName="취미"
                  header="취미"
                  hobbyName="idealHobby"
                />
              </idealHobbyContext.Provider>

              <Select
                className="drink"
                placeholder="음주"
                options={drinkData}
                isSearchable={false}
                onChange={onIdealDrinkHandler}
                styles={customStyle}
              />

              <Select
                className="smoke"
                placeholder="흡연"
                options={smokeData}
                isSearchable={false}
                onChange={onIdealSmokeHandler}
                styles={customStyle}
              />
            </div>
          </div>

          <div className="PageButton" id="DetailProfile">
            <div className="PageButtonForm">
              <button
                className="btn-hover pink nextButton submitButton"
                type="submit"
              >
                제출
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const Input = styled.input`
  width: 338px;
  height: 55px;
  border-radius: 10px;
  border: 2px solid #dee2e6;
  margin-top: 30px;
  padding-left: 15px;
  ::placeholder {
    color: #a5a5a5;
  }
`;

const UploadImage = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export { DetailProfile as default, hobbyContext, idealHobbyContext };
