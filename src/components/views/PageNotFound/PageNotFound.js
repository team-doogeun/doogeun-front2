import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>404 ERROR!</h1>
      <p>
        죄송합니다. 페이지를 찾을 수 없습니다.
        <br /> 존재하지 않는 주소를 입력하셨거나 <br />
        요청하신 페이지의 주소가 변경 또는 삭제되어 찾을 수 없습니다.
      </p>
      <Input
        className="home-button"
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로
      </Input>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  margin-left: 250px;
  margin-top: 300px;
  > h1 {
    font-weight: 700;
  }
  > p {
    color: #747474;
    margin: 5px;
    word-spacing: 2px;
    line-height: 25px;
  }
`;
const Input = styled.button`
  border-radius: 30px;
  padding: 5px 15px;
  background-color: #ff2559;
  font-weight: 700;
  width: 150px;
  height: 40px;
  color: #fff;
  border: none;
  margin-top: 40px;
  cursor: pointer;
`;

export default PageNotFound;
