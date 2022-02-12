import { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../store/ThemeContext';

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  border-radius: 25px;
  background-color: #ccc;

  input[type='checkbox'] {
    display: none;
  }

  .switch {
    cursor: pointer;
    border-radius: 25px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #cbcacc;

    &::before {
      position: absolute;
      content: '';
      left: 2px;
      top: 2px;
      width: 21px;
      height: 21px;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.3s;
      z-index: 1;
    }

    &::after {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 25px;
      background: linear-gradient(120deg, #4ca6ff 15%, #e544e5, #ffa54c);
      opacity: 0;
      transition: opacity 0.2s;
    }
  }

  input[type='checkbox']:checked + .switch::before {
    transform: translateX(25px);
  }

  input[type='checkbox']:checked + .switch::after {
    opacity: 1;
  }
`;

const ToggleSwitch = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <Label>
      <input
        type="checkbox"
        checked={themeCtx.dark}
        onChange={themeCtx.toggleTheme}
      />
      <span className="switch" />
    </Label>
  );
};

export default ToggleSwitch;
