import zIndex from '@mui/material/styles/zIndex';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AddBoardTrue, BoardListTrue } from '../../../navigation';
import Board from './Board';
import BoardCreate from './BoardCreate';

const HeaderWrapper = styled.div`
  padding: 1.2rem 4rem;
  color: #282c34;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: snow;
  border-radius: 10px;
  .header-title {
    span {
      font-size: 3rem;
      display: flex;
      align-items: center;
      font-family: 'Pacifico', cursive;
    }
  }
  .header-menu {
    display: flex;
    flex-wrap: wrap;
  }
`;
