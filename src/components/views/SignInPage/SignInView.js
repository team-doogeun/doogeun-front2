import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import styled, { keyframes } from "styled-components";
import Logo from "../../../Img/Logo.svg";

const SignInView = ({ loginSubmit, loginError, navigator }) => {
  return (
    <>
      <Formik
        initialValues={{
          userId: "",
          password: "",
        }}
        onSubmit={loginSubmit}
      >
        {({ values, handleSubmit, handleChange }) => (
          <LoginWrapper>
            <LoginTitle>
              <img src={Logo} />
              <> </>doogeun
            </LoginTitle>
            <form onSubmit={handleSubmit} autoComplete="off">
              <InputFromWrapper>
                <div className="input-forms-item">
                  <LoginInput
                    value={values.userId}
                    name="userId"
                    variant="outlined"
                    onChange={handleChange}
                    placeholder="아이디"
                  />
                </div>
                <div className="input-forms-item">
                  <PasswordInput
                    value={values.password}
                    name="password"
                    variant="outlined"
                    type="password"
                    onChange={handleChange}
                    placeholder="비밀번호"
                  />
                </div>
                {loginError.errorMessage && (
                  <ErrorMessageWrapper>
                    <ErrorMessage>{loginError.errorMessage}</ErrorMessage>
                  </ErrorMessageWrapper>
                )}
                <LoginButton
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  error={loginError.errorMessage}
                >
                  로그인
                </LoginButton>
              </InputFromWrapper>
            </form>
            <AdditionalBox>
              <span
                onClick={() => {
                  navigator("/myprofile");
                }}
              >
                회원가입
              </span>
              <span
                onClick={() => {
                  navigator("/find");
                }}
              >
                비밀번호 찾기
              </span>
            </AdditionalBox>
          </LoginWrapper>
        )}
      </Formik>
    </>
  );
};
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const LoginTitle = styled.div`
  position: relative;
  width: 234px;
  height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: #ff4572;
  margin: 0 auto;
`;

const InputFromWrapper = styled.div`
  position: relative;
  margin-top: 30px;
`;

const LoginInput = styled.input`
  box-sizing: border-box;
  position: relative;
  width: 330px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #000000;
  ::placeholder {
    color: #aaaaaa;
  }
  z-index: 2;
  padding-left: 16px;
  margin-bottom: 8px;
`;

const PasswordInput = styled.input`
  box-sizing: border-box;
  position: relative;
  width: 330px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #000000;
  ::placeholder {
    color: #aaaaaa;
  }
  z-index: 2;
  padding-left: 16px;
`;

const LoginButton = styled.button`
  width: 330px;
  height: 50px;
  cursor: pointer;
  border: none;
  background-color: #ff4572;
  color: #fff;
  border-radius: 8px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  margin-top: ${(props) => (props.error ? "0" : "25px")};
  z-index: 2;
`;

const AdditionalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  margin-top: 20px;
  margin-right: 35px;
  > span {
    margin-left: 12px;
    cursor: pointer;
    color: #666666;
    :hover {
      color: #ff4572;
      font-weight: 700;
    }
  }
`;

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const ErrorMessageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 12px;
  margin-left: 40px;
`;

const ErrorMessage = styled.div`
  position: relative;
  width: 326px;
  height: 21px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #f50d0d;
  text-align: center;

  animation: ${shake} 0.5s linear;
`;
export default SignInView;
