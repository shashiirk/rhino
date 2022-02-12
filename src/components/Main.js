import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import Head from './Head';
import Overview from './Overview';
import DashBoard from './DashBoard';
import { TransactionsContext } from '../store/TransactionsContext';
import { ThemeContext } from '../store/ThemeContext';

const rotation = keyframes`
  0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  width: 48px;
  height: 48px;
  margin: auto;
  border: 3px solid #e3e2e4;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  animation: ${rotation} 1s linear infinite;

  &.dark {
    border-color: #30363e;
  }

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(120deg, #4ca6ff 15%, #e544e5, #ffa54c);
    width: 16px;
    height: 16px;
    transform: translate(-50%, 50%);
    border-radius: 50%;
  }
`;

const Main = (props) => {
  const transactionsCtx = useContext(TransactionsContext);
  const themeCtx = useContext(ThemeContext);

  const incomeAmount = transactionsCtx.income.reduce(
    (previous, current) => previous + current.amount,
    0
  );
  const expensesAmount = transactionsCtx.expenses.reduce(
    (previous, current) => previous + -current.amount,
    0
  );
  const totalAmount = incomeAmount - expensesAmount;

  return (
    <>
      <Head {...props} />
      {transactionsCtx.loading ? (
        <Loader className={themeCtx.dark ? 'dark' : ''} />
      ) : (
        <>
          <Overview
            total={totalAmount}
            income={incomeAmount}
            expenses={expensesAmount}
          />
          <DashBoard
            incomeItems={transactionsCtx.income}
            expensesItems={transactionsCtx.expenses}
          />
        </>
      )}
    </>
  );
};

export default Main;
