import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import NanumSquareRoundBold from './fonts/NanumSquareRoundB.ttf';
import NanumSquareRoundExtraBold from "./fonts/NanumSquareRoundEB.ttf"
import HomePage from './components/views/HomePage/HomePage';
import BlindDatePage from './components/views/BlindDatePage/BlindDateContainer';
import MyProfile from './components/views/SignUpPage/MyProfile';
import DetailProfile from './components/views/SignUpPage/DetailProfile';
import FindPasswordContainer from './components/views/FindPassword/FindPasswordContainer';
import PageNotFound from './components/views/PageNotFound/PageNotFound';
import MeetingPageSelectContainer from './components/views/MeetingPage/MeetingPageFirst/MeetingPageSelectContainer';
import PrivateRoute from './PrivateRoute';
import UserPageMainContainer from './components/views/UserPage/UserPageMain/UserPageMainContainer';
import UserPageBlindDateContainer from './components/views/UserPage/UserPageBlindDate/UserPageBlindDateContainer';
import UserPageMeetingContainer from './components/views/UserPage/UserPageMeeting/UserPageMeetingContainer';
import FirstPage from './components/views/SignUpPage/FirstPage';

const GlobalStyle = createGlobalStyle`
@font-face {
        font-family: 'NanumSquareRoundBold';
        src: local('NanumSquareRoundB'), local('NanumSquareRoundB');
        font-style: normal;
        src: url(${NanumSquareRoundBold}) format('truetype');
  }

@font-face {
    font-family: 'NanumSquareRoundExtraBold';
    src: local('NanumSquareRoundEB'), local('NanumSquareRoundEB');
    font-style: normal;
    src: url(${NanumSquareRoundExtraBold}) format('truetype');
}

  body {
    width:100%;
    margin-top: 80px;
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="superContainer">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/blindDate"
            element={
              <PrivateRoute>
                <BlindDatePage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/group"
            element={
              <PrivateRoute>
                <MeetingPageSelectContainer />
              </PrivateRoute>
            }
          ></Route>
          <Route path='/signup' element={<FirstPage />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/detailprofile" element={<DetailProfile />}></Route>
          <Route path="/find" element={<FindPasswordContainer />} />
          <Route path="/*" element={<PageNotFound />} />

          <Route
            path='mypage'
            element={
              <PrivateRoute>
              <UserPageMainContainer />
              </PrivateRoute>
            }
          />
          
          {/* 마이페이지 기능 테스트, 디자인  */}
          {/* 소개팅방 */}
          <Route
            path="/mypage/blindDate"
            element={
              <PrivateRoute>
                <UserPageBlindDateContainer />
              </PrivateRoute>
            }
          />
          {/* 미팅방 */}
          <Route
            path="/mypage/meeting"
            element={
              <PrivateRoute>
                <UserPageMeetingContainer />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
