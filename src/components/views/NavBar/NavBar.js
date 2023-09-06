import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "../../Modal/LoginModal";
import SingInContainer from "../SignInPage/SignInContainer";
import Logo from "../../../Img/Logo.svg";
import { useNavigate } from "react-router-dom";
import { checkJWTCookieExistence, getJWTCookie } from "../../Api/loginApi";
import ProfileContainer from "../Profile/ProfileContainer";
import profileImage from "../../../Img/BasicProfilePhoto.png";

function NavBar() {
  // 일단 Login 세션 구현
  const navigator = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useState(false);
  const [profile, setProfile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const ProfileRef = useRef(null);
  const UserButtonRef = useRef(null);

  const checkJwtTokenExistence = () => {
    const token = checkJWTCookieExistence();
    setCookie(token); // true 값으로 업데이트
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        UserButtonRef.current &&
        !UserButtonRef.current.contains(event.target) &&
        ProfileRef.current &&
        !ProfileRef.current.contains(event.target)
      ) {
        setProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    checkJwtTokenExistence();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ProfileRef, setProfile, loading]);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderWrapper scrollPosition={scrollPosition}>
      <HeaderContainer>
        <LogoImage src={Logo} onClick={() => navigator("/")} />
        <Nav>
          {loading === false && !cookie ? (
            <>
              <RegisterButton
                onClick={() => {
                  navigator("/myprofile");
                }}
              >
                회원가입
              </RegisterButton>
              <LoginButton
                onClick={() => {
                  setLoginModal(true);
                }}
              >
                로그인
              </LoginButton>
              {loginModal && (
                <Modal
                  CloseModal={() => {
                    setLoginModal(!loginModal);
                  }}
                >
                  <SingInContainer />
                </Modal>
              )}
            </>
          ) : (
            <>
              <ProfilePhoto
                src={profileImage}
                alt="ProfilePhoto"
                ref={UserButtonRef}
                onClick={() => {
                  setProfile(!profile);
                }}
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? "block" : "none" }}
              />
              {!imageLoaded && <ProfilePhotoPlaceholder />}
              <ProfileWrapper ref={ProfileRef}>
                {profile && <ProfileContainer profileImageUrl={profileImage} />}
              </ProfileWrapper>
              <Name>{getJWTCookie("userId")}님</Name>
            </>
          )}
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1000;
  box-shadow: ${(props) =>
    props.scrollPosition >= 0
      ? "0 0.125rem 0.0625rem -0.0625rem #d9d9d9"
      : "none"};
  transition: box-shadow 0.5s ease;
`;

const HeaderContainer = styled.div`
  height: 5rem;
  max-width: 65rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

const Nav = styled.nav`
  display: flex;
  margin-left: auto;
`;

const buttonStyles = `
  font-size: 0.8rem; 
  padding: 0.3rem 1.0rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  cursor: pointer;
`;

const LoginButton = styled.button`
  border: 1px solid #ff4572;
  border-radius: 6px;
  font-weight: 700;
  background: #ff426f;
  color: #fff;
  ${buttonStyles}
`;

const RegisterButton = styled.button`
  border: none;
  font-weight: 700;
  color: #777777;
  background: transparent;
  ${buttonStyles}

  &:hover {
    color: #ff4572;
  }
`;

const LogoutButton = styled.button`
  border: 0.0625rem solid #ff4572;
  border-radius: 0.4375rem;
  font-weight: 700;
  background: #ff426f;
  color: #fff;
  ${buttonStyles}
`;

const Name = styled.div`
  font-weight: 700;
  display: flex;
  color: #252525;
  justify-contents: center;
  align-items: center;
  margin-left: 15px;
  font-size: 0.9rem;
`;

const ProfilePhotoPlaceholder = styled.div`
  width: 30px;
  height: 30px;
  background-color: #f9f9f9;
`;

const ProfilePhoto = styled.img`
  position: relative;
  width: 40px;
  height: 40px;

  border-radius: 6px;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  position: fixed;
`;

export default NavBar;
