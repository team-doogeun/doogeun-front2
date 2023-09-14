import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-scroll";
import { FaArrowCircleUp } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import blindDatePicture from "../../../Img/blindDate_Picture.png";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import banner1 from "../../../Img/banner1.png";
import banner2 from "../../../Img/banner2.png";
import banner3 from "../../../Img/banner3.png";

const GlobalStyle = createGlobalStyle`

  .carousel .control-dots .dot {
    top:0;
    background: #f5f5f5;
    box-shadow: none;
    width: 13px;
    height: 13px;
    margin-bottom: 20px;
  }

  .carousel .control-dots .dot.selected {
    background: #fff;
    box-shadow: none;
  }
`;

const LeftToRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const RightToLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HomePage = () => {
  const navigator = useNavigate();
  const [visible, setVisible] = useState(false);
  const [animateSectionOne, setAnimateSectionOne] = useState(false);
  const [animateSectionTwo, setAnimateSectionTwo] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    const sectionOne = document.getElementById("section1");
    if (sectionOne) {
      const sectionTop = sectionOne.getBoundingClientRect().top;
      const sectionBottom = sectionOne.getBoundingClientRect().bottom;
      const sectionHeight = sectionOne.offsetHeight;

      if (
        sectionTop <= window.innerHeight - sectionHeight * 0.1 &&
        sectionBottom >= sectionHeight * 0.1
      ) {
        setAnimateSectionOne(true);
      } else {
        setAnimateSectionOne(false);
      }
    }

    const sectionTwo = document.getElementById("section2");
    if (sectionTwo) {
      const sectionTop = sectionTwo.getBoundingClientRect().top;
      const sectionBottom = sectionTwo.getBoundingClientRect().bottom;
      const sectionHeight = sectionTwo.offsetHeight;

      if (
        sectionTop <= window.innerHeight - sectionHeight * 0.1 &&
        sectionBottom >= sectionHeight * 0.1
      ) {
        setAnimateSectionTwo(true);
      } else {
        setAnimateSectionTwo(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  useEffect(() => {
    const sectionOne = document.getElementById("section1");
    const sectionTwo = document.getElementById("section2");

    const handleIntersection = (entries, observer) => {
      const [entry] = entries;
      if (entry.target.id === "section1") {
        if (entry.isIntersecting) {
          sectionOne.classList.add("animate");
          observer.unobserve(sectionOne);
          observer.observe(sectionTwo);
        } else {
          sectionOne.classList.remove("animate");
        }
      } else if (entry.target.id === "section2") {
        if (entry.isIntersecting) {
          sectionTwo.classList.add("animate");
        } else {
          sectionTwo.classList.remove("animate");
        }
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (sectionOne) {
      observer.observe(sectionOne);
    }

    if (sectionTwo) {
      observer.observe(sectionTwo);
    }

    return () => {
      if (sectionOne) {
        observer.unobserve(sectionOne);
      }
      if (sectionTwo) {
        observer.unobserve(sectionTwo);
      }
    };
  }, []);

  return (
    <>
      {" "}
      <Main>
        <Section>
          <GlobalStyle />
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            interval={5000}
          >
            <Banner>
              <TextContainer>
                <h2>CC가 어려워?</h2>
                <h4>그럼 두근하자!</h4>
              </TextContainer>
              <ButtonContainer>
                <Link to="#" onClick={() => scrollToSection("section1")}>
                  <BlindDateButton>소개팅</BlindDateButton>
                </Link>
                <Link to="#" onClick={() => scrollToSection("section2")}>
                  <MeetingButton>미팅</MeetingButton>
                </Link>
              </ButtonContainer>
              <ImgBanner1 src={banner1} alt="Banner 1" title="두근에서" />
            </Banner>
            <Banner>
              <TextContainer>
                <h2>학교 친구에서, 연인으로</h2>
                <h4>너도 두근 나도 두근!</h4>
              </TextContainer>
              <ButtonContainer>
                <Link to="#" onClick={() => scrollToSection("section1")}>
                  <BlindDateButton>소개팅</BlindDateButton>
                </Link>
                <Link to="#" onClick={() => scrollToSection("section2")}>
                  <MeetingButton>미팅</MeetingButton>
                </Link>
              </ButtonContainer>
              <img src={banner2} alt="Banner 2" />
            </Banner>
            <Banner>
              <TextContainer>
                <h2>캠퍼스 낭만을 원한다면</h2>
                <h4>우리 모두 두근!</h4>
              </TextContainer>
              <ButtonContainer>
                <Link to="#" onClick={() => scrollToSection("section1")}>
                  <BlindDateButton>소개팅</BlindDateButton>
                </Link>
                <Link to="#" onClick={() => scrollToSection("section2")}>
                  <MeetingButton>미팅</MeetingButton>
                </Link>
              </ButtonContainer>
              <img src={banner3} alt="Banner 3" />
            </Banner>
          </Carousel>
        </Section>

        <SectionContainer>
          <SectionOne
            id="section1"
            className={animateSectionOne ? "animate" : ""}
          >
            <SectionOneLeftContainer>
              <h2 className={animateSectionOne ? "animate" : ""}>
                1대 1로 매칭되는 두근 서비스!
                <br />
                <br />
                간편한 방식으로 상대방과 두근을 느껴보세요.
                <br />
                가장 어울리는 이상형을 소개해드립니다.
              </h2>
              <GoToBlindDate
                onClick={() => {
                  navigator("/blindDate");
                }}
              >
                소개팅
              </GoToBlindDate>
            </SectionOneLeftContainer>
            <SectionOneRightContainer>
              <img src={blindDatePicture} />
            </SectionOneRightContainer>
          </SectionOne>
          <SectionTwo
            id="section2"
            className={animateSectionTwo ? "animate" : ""}
          >
            <SectionTwoLeftContainer>
              <h2 className={animateSectionTwo ? "animate" : ""}>
                다 함께 미팅 서비스!
                <br />
                <br />
                학교 사람들과 안전한 미팅을!
              </h2>

              <GoToBlindDate
                onClick={() => {
                  navigator("/group");
                }}
              >
                미팅
              </GoToBlindDate>
            </SectionTwoLeftContainer>
          </SectionTwo>
        </SectionContainer>
        <ScrollToTop>
          <FaArrowCircleUp
            onClick={scrollToTop}
            style={{ display: visible ? "inline" : "none" }}
            size="45"
            color="gray"
          />
        </ScrollToTop>
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 530px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  color: #ffffff;
`;

const Banner = styled.div`
  width: 100%;
  height: calc(90vh - 100px);
  background-color: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 2000px;
    max-height: 2000px;
    object-fit: cover;
  }
`;

const ImgBanner1 = styled.img`
  width: 1500px;
  height: 1500px;
  object-fit: cover;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 25%;
  left: 28%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Section = styled.section`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 2rem;
    color: #252525;
  }

  p {
    color: #252525;
  }
`;

const SectionOne = styled.section`
  min-height: 100vh;
  max-width: 1040px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  animation: ${LeftToRight} 2.5s ease-in;

  h2 {
    color: #252525;
    opacity: 0;

    &.animate {
      opacity: 1;
    }
  }

  p {
    color: #252525;
  }

  img {
    width: 500px;
    height: 500px;
  }
`;

const SectionTwo = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  animation: ${RightToLeft} 2.5s ease-in;

  h2 {
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 1.8rem;
    color: #252525;
    opacity: 0;
    text-align: right;
    &.animate {
      opacity: 1;
    }
  }

  p {
    color: #252525;
  }

  img {
    width: 500px;
    height: 500px;
  }
`;

const ScrollToTop = styled.div`
  position: fixed;
  width: 100%;
  bottom: 40px;
  align-items: center;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
  cursor: pointer;
  animation: fadeIn 0.3s;
  transition: opacity 0.4s;
  opacity: 0.5;
  padding: 3rem;

  &:hover {
    opacity: 1;
  }
`;

const SectionOneLeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 140px;
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

const SectionOneRightContainer = styled.div`
  display: flex;
`;

const SectionTwoLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BlindDateButton = styled.span`
  border: none;
  background-color: #fff;
  width: 170px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-size: 1rem;
  background-color: #fff;
  color: #ff493e;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  z-index: 2;
`;

const MeetingButton = styled.span`
  border: none;
  background-color: #fff;
  width: 170px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: GmarketSansTTFBold, sans-serif, Arial;
  font-size: 1rem;
  background-color: #fff;
  color: #ff493e;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  z-index: 2;
`;

const GoToBlindDate = styled.button`
  border: none;
  width: 200px;
  height: 60px;
  border-radius: 13px;
  background-color: #ff2559;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const SectionContainer = styled.div`
  max-width: 1040px;
  margin: 0 auto;
`;

const TextContainer = styled.div`
  position: absolute;
  margin: 0 auto;
  left: 15.5%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  top: 40%;
  h2 {
    align-items: center;
    justify-content: center;
    font-family: GmarketSansTTFBold, sans-serif, Arial;
    font-size: 3rem;
    color: #fff;
    text-align: center;
    border: none;
    border-radius: 10px;
    z-index: 2;
  }

  h4 {
    text-align: left;
    font-weight: 500;
    color: #fff;
    font-family: GmarketSansTTFBold, sans-serif, Arial;
  }
`;

export default HomePage;
