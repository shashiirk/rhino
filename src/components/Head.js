import { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { BarsIcon } from '../assets/icons';
import Menu from './Menu';
import { ThemeContext } from '../store/ThemeContext';

const slideUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(-107%);
  }
`;

const slideDown = keyframes`
  to {
    opacity: 1;
    transform: translateY(94%);
  }
`;

const Div = styled.div`
  /* border: 1px green solid; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &.dark {
    .profile .info .greeting {
      color: #797e83;
    }

    .settings {
      color: #e8e9ea;
    }
  }

  .profile {
    display: flex;
    align-items: stretch;

    .img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 8px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.14);
    }

    .info {
      /* border: 1px red solid; */
      display: flex;
      flex-direction: column;
      justify-content: center;

      &.slide {
        position: relative;
        width: 200px;

        .greeting {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          animation: ${slideUp} 700ms 100ms forwards;
        }

        .name {
          position: absolute;
          bottom: 50%;
          transform: translateY(50%);
          opacity: 0;
          animation: ${slideDown} 700ms 100ms forwards;
        }
      }

      .greeting {
        color: #6b7280;
        font-size: 14px;
      }
    }
  }

  .settings {
    border: 1px red solid;
    background-color: inherit;
    padding: 4px;
    border: none;
    outline: none;
    cursor: pointer;

    .icon {
      display: block;
    }
  }
`;

const Head = (props) => {
  const [isMenuVisible, setIsMenuVisibile] = useState(false);
  const themeCtx = useContext(ThemeContext);

  const toggleMenuHandler = () => {
    if (isMenuVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuVisibile(true);
  };

  const closeMenu = () => {
    setIsMenuVisibile(false);
  };

  return (
    <Div className={themeCtx.dark ? 'dark' : ''}>
      <div className="profile">
        <img src={props.user.photoURL} alt="profile" className="img" />
        <div className={`info ${props.isInitial ? 'slide' : ''}`}>
          <p className="greeting">Welcome!</p>
          <p className="name">{props.user.displayName}</p>
        </div>
      </div>
      <button className="settings" onClick={toggleMenuHandler}>
        <BarsIcon />
      </button>
      {isMenuVisible && <Menu onClose={closeMenu} />}
    </Div>
  );
};

export default Head;
