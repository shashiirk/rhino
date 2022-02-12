import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import { LogoIcon } from '../assets/icons';
import { ThemeContext } from '../store/ThemeContext';

const loading = keyframes`
  0% {
    left: -30%;
  }
  
  50% {
    left: 80%;
  }
  
  100% {
    left: -30%;
  }
`;

const Div = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.dark {
    .wrapper {
      background-color: #30363e;
    }
  }

  .logo {
    margin-bottom: 24px;

    svg {
      width: 48px;
      height: auto;
    }
  }

  .wrapper {
    width: 144px;
    height: 4px;
    border-radius: 99px;
    background-color: #e3e2e4;
    position: relative;
    overflow-x: hidden;

    .bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 50%;
      background: linear-gradient(120deg, #4ca6ff 15%, #e544e5, #ffa54c);
      animation: ${loading} 2000ms infinite;
    }
  }
`;

const Loading = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <Div className={themeCtx.dark ? 'dark' : ''}>
      <div className="logo">
        <LogoIcon />
      </div>
      <div className="wrapper">
        <div className="bar"></div>
      </div>
    </Div>
  );
};

export default Loading;
