import { useContext } from 'react';
import styled from 'styled-components';

import { getFormattedCurrency } from '../services/utils';
import { ThemeContext } from '../store/ThemeContext';

const Div = styled.div`
  &.dark {
    color: #e8e9ea;
    box-shadow: 0 0 14px rgba(255, 255, 255, 0.14);
  }

  background: linear-gradient(120deg, #4ca6ff 15%, #e544e5, #ffa54c);
  color: white;
  padding: 16px;
  margin: 32px 0 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.14);

  .total {
    text-align: center;
    margin-bottom: 28px;

    .title {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .content {
      font-size: 28px;
    }
  }

  .box {
    display: flex;
    justify-content: space-between;

    .income,
    .expenses {
      display: flex;
      align-items: center;

      .icon-holder {
        background-color: rgba(255, 255, 255, 0.24);
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }

      .info {
        margin-left: 12px;

        .title {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .content {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    .income .icon {
      display: block;
      color: #008b00;
    }

    .expenses .icon {
      display: block;
      color: #db0000;
    }
  }
`;

const Overview = (props) => {
  const themeCtx = useContext(ThemeContext);

  return (
    <Div className={themeCtx.dark ? 'dark' : ''}>
      <div className="total">
        <p className="title">Total Balance</p>
        <p className="content">
          {props.total < 0
            ? `- ${getFormattedCurrency(-props.total)}`
            : getFormattedCurrency(props.total)}
        </p>
      </div>
      <div className="box">
        <div className="income">
          <div className="icon-holder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-down"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="18" y1="13" x2="12" y2="19" />
              <line x1="6" y1="13" x2="12" y2="19" />
            </svg>
          </div>
          <div className="info">
            <p className="title">Income</p>
            <p className="content">{getFormattedCurrency(props.income)}</p>
          </div>
        </div>
        <div className="expenses">
          <div className="icon-holder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-up"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="18" y1="11" x2="12" y2="5" />
              <line x1="6" y1="11" x2="12" y2="5" />
            </svg>
          </div>
          <div className="info">
            <p className="title">Expenses</p>
            <p className="content">{getFormattedCurrency(props.expenses)}</p>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Overview;
