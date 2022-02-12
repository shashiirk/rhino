import { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import { signOut } from 'firebase/auth';

import ToggleSwitch from './ToggleSwitch';
import { auth } from '../services/firebase-config';
import { ThemeContext } from '../store/ThemeContext';

const fadeIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Div = styled.div`
  &.dark {
    background-color: #30363e;
    box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);

    .item {
      &:active {
        background-color: #3d4248;
      }
    }
  }

  background-color: white;
  padding: 6px 0;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;
  right: 0;
  transform-origin: top right;
  animation: ${fadeIn} 240ms forwards;

  &.close {
    animation: ${fadeOut} 240ms forwards;
  }

  .special {
    padding: 10px 16px;
    display: flex;
    align-items: center;

    p {
      margin-right: 16px;
    }
  }

  .item {
    padding: 10px 16px;
    cursor: pointer;

    &:active {
      background-color: #f4f4f4;
    }
  }
`;

const Menu = (props) => {
  const [closeMenu, setCloseMenu] = useState(false);
  const themeCtx = useContext(ThemeContext);

  const closeMenuHandler = () => {
    setCloseMenu(true);
    setTimeout(props.onClose, 240);
  };

  const signOutHandler = () => {
    signOut(auth)
      .then((result) => {
        localStorage.removeItem('darkMode');
        if (themeCtx.dark) {
          themeCtx.toggleTheme();
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <Div
      className={
        themeCtx.dark
          ? closeMenu
            ? 'dark close'
            : 'dark'
          : closeMenu
          ? 'close'
          : ''
      }
    >
      <OutsideClickHandler onOutsideClick={closeMenuHandler}>
        <div className="special">
          <p>Dark theme</p>
          <ToggleSwitch />
        </div>
        <div className="item" onClick={signOutHandler}>
          Sign out
        </div>
      </OutsideClickHandler>
    </Div>
  );
};

export default Menu;
