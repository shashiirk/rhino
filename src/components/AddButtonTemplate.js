import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { PlusIcon, MinusIcon } from '../assets/icons';
import { ThemeContext } from '../store/ThemeContext';

const scale = keyframes`
  0% {
    transform: scale(1);   
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const rotateClockWise = keyframes`
  0% {
    transform:  rotate(0deg);   
  }

  50% {
    transform: rotate(90deg);
  }

  100% {
    transform:  rotate(180deg);
  }
`;

const rotateAntiClockWise = keyframes`
  0% {
    transform:  rotate(0deg);   
  }
  
  100% {
    transform: rotate(-90deg);
  }
`;

const Button = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  margin-left: auto;
  border: none;
  background: linear-gradient(120deg, #4ca6ff 15%, #e544e5, #ffa54c);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.14);
  transition: transform 240ms ease;

  &.dark {
    color: #e8e9ea;
  }

  &.swirl {
    animation: ${scale} 240ms ease;

    .icon {
      animation: ${(props) =>
          props.type === 'income' ? rotateAntiClockWise : rotateClockWise}
        240ms ease;
    }
  }

  .icon {
    display: block;
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
`;

const AddButtonTemplate = (props) => {
  const history = useHistory();
  const themeCtx = useContext(ThemeContext);

  const addIncomeHandler = () => {
    history.push('/add-income');
  };

  const addExpensesHandler = () => {
    history.push('/add-expenses');
  };

  return (
    <Button
      onClick={props.type === 'income' ? addIncomeHandler : addExpensesHandler}
      className={
        themeCtx.dark
          ? props.animate
            ? 'dark swirl'
            : 'dark'
          : props.animate
          ? 'swirl'
          : ''
      }
      type={props.type}
    >
      {props.type === 'income' ? <PlusIcon /> : <MinusIcon />}
    </Button>
  );
};

export default AddButtonTemplate;
