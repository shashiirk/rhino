import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';

import { CloseIcon, RupeeIcon } from '../assets/icons';
import SelectCategory from './SelectCategory';
import PickDate from './PickDate';
import { db } from '../services/firebase-config';
import { AuthContext } from '../store/AuthContext';
import { ThemeContext } from '../store/ThemeContext';

const fade = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const slide = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  &.dark {
    .close {
      color: #e8e9ea;
    }
    form {
      .form-control {
        .holder {
          background-color: #30363e;
          color: #e8e9ea;
          input {
            background-color: #30363e;
            color: #e8e9ea;
          }
        }
      }
    }
    .warning {
      background-color: rgba(255, 255, 255, 0.95);
      color: black;
    }
  }
  .close {
    background-color: inherit;
    padding: 4px;
    margin-left: auto;
    margin-bottom: 48px;
    border: none;
    outline: none;
    cursor: pointer;
    .icon {
      display: block;
    }
  }
  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    animation: ${slide} 240ms ease;
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 32px;
    }
    .form-control {
      margin-bottom: 16px;
      &:first-of-type {
        margin-bottom: 32px;
        .holder {
          font-size: 20px;
          width: 75%;
          margin: auto;
          padding-right: 32px;
          display: flex;
          justify-content: center;
          border-radius: 99px;
          overflow: hidden;
          input {
            margin-left: 4px;
            min-width: 28px;
            font-size: 40px;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            &[type='number'] {
              -moz-appearance: textfield;
              &::placeholder {
                color: #9ca3af;
              }
            }
          }
        }
      }
      &:last-of-type {
        margin-bottom: 32px;
      }
      .holder {
        background-color: white;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 16px;
        border: none;
        outline: none;
        border-radius: 12px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        input {
          background-color: white;
          display: block;
          font: inherit;
          width: 100%;
          padding: 16px 0;
          border: none;
          border-radius: none;
          outline: none;
          &::placeholder {
            color: #9ca3af;
          }
        }
      }
    }
    .save {
      font: inherit;
      font-weight: 500;
      border-radius: 12px;
      border: none;
      width: 100%;
      padding: 16px;
      background: linear-gradient(120deg, #4ca6ff 15%, #e544e5, #ffa54c);
      color: white;
      cursor: not-allowed;
      opacity: 0.5;
      transition: opacity 240ms ease-in, transform 240ms ease;
      &.enable {
        cursor: pointer;
        opacity: 1;
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
  }
  .warning {
    background-color: rgba(0, 0, 0, 0.95);
    color: white;
    padding: 8px 32px;
    border-radius: 12px;
    font-size: 14px;
    position: fixed;
    bottom: 16px;
    display: none;
    &.enable {
      display: block;
      animation: ${fade} 3s ease;
    }
  }
`;

const FormAddTemplate = (props) => {
  const [width, setWidth] = useState(0);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [activateWarning, setActivateWarning] = useState(false);

  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);

  useEffect(() => {
    setIsFormValid(amount !== 0 && category !== '' && date !== '');
    return () => {
      setIsFormValid(false);
    };
  }, [amount, category, date]);

  const amountRef = useRef();
  const noteRef = useRef();

  const navigate = useNavigate();

  const closeHandler = () => {
    navigate(-1);
  };

  const focusInputHandler = () => {
    amountRef.current.focus();
  };

  const setAmountHandler = (ev) => {
    // Adjust input field width
    if (Number.isInteger(+ev.target.value)) {
      setWidth(ev.target.value.length);
    } else {
      setWidth(ev.target.value.length - 1);
    }

    setAmount(+ev.target.value);
  };

  const setCategoryHandler = (value) => {
    noteRef.current.placeholder = `(${
      value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
    })`;
    setNote(value.charAt(0).toUpperCase() + value.substr(1).toLowerCase());
    setCategory(value);
  };

  const setNoteHandler = (ev) => {
    setNote(ev.target.value);
  };

  const setDateHandler = (value) => {
    setDate(value);
  };

  const submitButtonHandler = () => {
    if (!isFormValid) {
      setActivateWarning(true);
      setTimeout(() => {
        setActivateWarning(false);
      }, 3000);
    }
  };

  const submitFormHandler = (ev) => {
    ev.preventDefault();
    if (isFormValid) {
      if (props.type === 'income') {
        const item = {
          amount: amount,
          category: category,
          note: note,
          date: date,
        };
        console.log(item);

        addDoc(collection(db, authCtx.user.uid), item).catch((error) => {
          console.log(error);
        });
      } else if (props.type === 'expenses') {
        const item = {
          amount: -amount,
          category: category,
          note: note,
          date: date,
        };

        addDoc(collection(db, authCtx.user.uid), item).catch((error) => {
          console.log(error);
        });
      }

      closeHandler();
    }
  };

  // console.log(amount, category, note, date);
  // console.log(isFormValid);

  return (
    <Div className={themeCtx.dark ? 'dark' : ''}>
      <button className="close" onClick={closeHandler}>
        <CloseIcon />
      </button>
      <form onSubmit={submitFormHandler}>
        <h2 className="title">
          {props.type === 'income' ? 'Add Income' : 'Add Expenses'}
        </h2>
        <div className="form-control">
          <div className="holder" onClick={focusInputHandler}>
            <RupeeIcon />
            <input
              type="number"
              placeholder="0"
              style={{ width: width * 28 + 8 + 'px' }}
              onInput={setAmountHandler}
              ref={amountRef}
            />
          </div>
        </div>
        <div className="form-control">
          <SelectCategory
            type={props.type}
            onChange={setCategoryHandler}
            value={category}
          />
        </div>
        <div className="form-control">
          <div className="holder">
            <input
              type="text"
              placeholder="Note"
              ref={noteRef}
              onChange={setNoteHandler}
            />
          </div>
        </div>
        <div className="form-control">
          <PickDate onChange={setDateHandler} />
        </div>
        <button
          type="submit"
          className={`save ${isFormValid ? 'enable' : ''}`}
          onClick={submitButtonHandler}
        >
          SAVE
        </button>
      </form>
      <div className={`warning ${activateWarning ? 'enable' : ''}`}>
        Please fill all the fields
      </div>
    </Div>
  );
};

export default FormAddTemplate;
