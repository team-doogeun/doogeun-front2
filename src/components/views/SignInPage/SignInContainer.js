import axios from "axios";
import SignInView from "./SignInView";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setJWTCookie } from "../../Api/loginApi";

const SignInContainer = () => {
  const navigator = useNavigate();
  const [loginError, setLoginError] = useState({});
  const ServerIp = process.env.REACT_APP_SERVER_IP;

  const loginJWT = async (values) => {
    const { userId, password } = values;

    try {
      await axios
        .post(`http://${ServerIp}/users/login`, {
          userId,
          password,
        })
        .then((res) => {
          if (res.data.code === "444") {
            setLoginError({
              errorMessage: "이메일 또는 비밀번호를 다시 확인해주세요.",
            });
            return;
          }

          if (res.data.data.token) {
            setJWTCookie("jwtAccessToken", res.data.data.token, {
              path: "/",
              sameSite: "strict",
            });
            setJWTCookie("userId", res.data.data.subject);
            setJWTCookie("name", res.data.data.name);
            // test -> 나중에 지우기
            localStorage.setItem("jwtToken", res.data.data.token);
            localStorage.setItem("userId", res.data.data.subject);
          }

          if (
            window.location.pathname === "/myprofile" ||
            window.location.pathname === "/detailprofile"
          )
            navigator("/");
          else window.location.reload();
          setLoginError({});
        })
        .catch((e) => {
          setLoginError({
            errorMessage: "이메일 또는 비밀번호를 다시 확인해주세요.",
          });
        });
    } catch (e) {
      setLoginError({
        errorMessage: "이메일 또는 비밀번호를 다시 확인해주세요.",
      });
    }
  };

  return (
    <SignInView
      loginSubmit={loginJWT}
      loginError={loginError}
      navigator={navigator}
    />
  );
};

export default SignInContainer;
