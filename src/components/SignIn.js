import styled, { keyframes } from 'styled-components';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { LogoIcon, GoogleIcon } from '../assets/icons';
import { auth } from '../services/firebase-config';

const shine = keyframes`
  0% {
    color: #4ca6ff;
  }

  50% {
    color: #e544e5;
  }

  100% {
    color: #ffa54c;
  }
`;

const Div = styled.div`
  margin: auto;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 24px 16px;
  border-radius: 12px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .head {
    /* border: 1px green solid; */
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 48px;
      height: auto;
    }

    span {
      margin-left: 8px;
      font-size: 36px;
      font-weight: 600;
    }
  }

  .body {
    /* border: 1px green solid; */
    flex: 1;
    margin: 36px 0;

    p {
      /* border: 1px red solid; */
      margin-bottom: 36px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font: inherit;
      padding: 16px 24px;
      margin: auto;
      border: 1px #f1f0f1 solid;
      /* border: none; */
      border-radius: 99px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      background-color: white;
      cursor: pointer;
      transition: transform 240ms ease;

      span {
        margin-left: 8px;
        /* font-size: 14px; */
      }

      @media (hover: hover) {
        &:hover {
          transform: scale(0.95);
        }
      }

      @media (hover: none) {
        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  .footer {
    a {
      text-decoration: none;
      animation: ${shine} 1.5s infinite alternate;
    }
  }
`;

const SignIn = () => {
  const signInHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Div>
      <div className="head">
        <LogoIcon />
        <span>Rhino</span>
      </div>
      <div className="body">
        <p>A simplistic expense tracking app</p>
        <button onClick={signInHandler}>
          <GoogleIcon />
          <span>Sign in with Google</span>
        </button>
      </div>
      <div className="footer">
        Built by{' '}
        <a href="https://github.com/shashiirk" target="_blank" rel="noreferrer">
          Shashikanth
        </a>
      </div>
    </Div>
  );
};

export default SignIn;
