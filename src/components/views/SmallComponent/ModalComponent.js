import React from "react";
import { useState } from "react";
import "./ModalComponent.css";
import SingInContainer from "../SignInPage/SignInContainer";
import NextPopupModal from "./NextPopupModal/NextPopupModal";
import HobbyPopupModal from "./hobby/HobbyPopupModal";

const ModalComponent = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    // 모달창 열면 스크롤 안보임
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    // 모달창 닫으면 스크롤 보임
    document.body.style.overflow = "unset";
  };

  const chooseContentName = (x) => {
    switch (x) {
      case "로그인":
        return "btn-hover pink loginButton";
      case "취미":
        return "btn-hover pink hobbyButton";
      case "다음":
        return "btn-hover pink nextButton";
      case "제출":
        return "btn-hover pink nextButton";
      default:
        return "";
    }
  };
  return (
    <React.Fragment>
      <div className="buttonContainer">
        <button
          className={chooseContentName(props.contentName)}
          onClick={openModal}
          disabled={props.disabled}
          type="button"
        >
          {props.contentName}
        </button>
      </div>
      <ModalContent
        open={modalOpen}
        close={closeModal}
        header={props.header}
        mainContent={props.mainContent}
        nextPage={props.nextPage}
        hobbyName={props.hobbyName}
      ></ModalContent>
    </React.Fragment>
  );
};

const ModalContent = (props) => {
  const { open, close, header, mainContent, nextPage } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className={mainContent}>
          <header>
            {header}
            <button className="close" onClick={close}>
              {/* 우측 상단의 x를 표시 */}
              &times;
            </button>
          </header>
          <main>
            {
              {
                login: <SingInContainer />,
                detailHobby: <HobbyPopupModal hobbyName={props.hobbyName} />,
                idealHobby: <HobbyPopupModal hobbyName={props.hobbyName} />,
                nextPage: <NextPopupModal />,
              }[mainContent]
            }
          </main>
          <footer className="footerContainer">
            {mainContent === "nextPage" ? (
              <a href={`/${nextPage}`} className="Msg" type="button">
                <button className="yesButton">
                  <span className="text">예</span>
                </button>
              </a>
            ) : null}

            <button
              className={mainContent === "nextPage" ? "noButton" : "close"}
              onClick={close}
              type="button"
            >
              {mainContent === "nextPage" ? (
                <span>아니오</span>
              ) : (
                <span>close</span>
              )}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalComponent;
