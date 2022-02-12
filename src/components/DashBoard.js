import { useContext, useState } from 'react';
import styled from 'styled-components';

import AddIncomeButton from './AddIncomeButton';
import AddExpensesButton from './AddExpensesButton';
import IncomeList from './IncomeList';
import ExpensesList from './ExpensesList';
import { ThemeContext } from '../store/ThemeContext';
import { CurrentTypeContext } from '../store/CurrentTypeContext';

const Div = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.dark {
    .box {
      background-color: #202831;

      .nav {
        background-color: #30363e;
        box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);
      }
    }
  }

  .box {
    background-color: #f6f4f7;
    /* border: 1px red solid; */
    padding: 16px 0;
    position: sticky;
    top: 0;
    z-index: 10;

    .title {
      font-size: 20px;
      font-weight: 600;
    }

    .nav {
      background-color: white;
      display: flex;
      margin-top: 16px;
      padding: 4px;
      border-radius: 12px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      position: relative;

      .slider {
        position: absolute;
        top: 4px;
        bottom: 4px;
        width: calc(50% - 4px);
        border-radius: 10px;
        background: linear-gradient(120deg, #4ca6ff 15%, #e544e5, #ffa54c);
        transition: transform 240ms ease;

        &.active {
          transform: translateX(100%);
        }
      }

      .nav-item {
        /* border: 1px green solid; */
        z-index: 10;
        flex: 1;
        text-align: center;
        padding: 16px 0;
        border-radius: 10px;
        cursor: pointer;
        transition: color 240ms ease;

        &.active {
          color: white;
        }
      }
    }
  }
`;

const DashBoard = (props) => {
  const themeCtx = useContext(ThemeContext);
  const currentTypeCtx = useContext(CurrentTypeContext);

  const [clicked, setClicked] = useState({ income: false, expenses: false });

  const setIncomeHandler = () => {
    currentTypeCtx.setCurrentType('income');
    setClicked({ income: true, expenses: false });
  };

  const setExpensesHandler = () => {
    currentTypeCtx.setCurrentType('expenses');
    setClicked({ income: false, expenses: true });
  };

  return (
    <Div className={themeCtx.dark ? 'dark' : ''}>
      <div className="box">
        <h2 className="title">Transactions</h2>
        <div className="nav">
          <div
            className={`slider ${
              currentTypeCtx.currentType === 'income' ? '' : 'active'
            }`}
          ></div>
          <div
            className={`nav-item ${
              currentTypeCtx.currentType === 'income' ? 'active' : ''
            }`}
            onClick={setIncomeHandler}
          >
            Income
          </div>
          <div
            className={`nav-item ${
              currentTypeCtx.currentType === 'expenses' ? 'active' : ''
            }`}
            onClick={setExpensesHandler}
          >
            Expenses
          </div>
        </div>
      </div>
      {currentTypeCtx.currentType === 'income' ? (
        <IncomeList items={props.incomeItems} />
      ) : (
        <ExpensesList items={props.expensesItems} />
      )}
      {currentTypeCtx.currentType === 'income' ? (
        <AddIncomeButton animate={clicked.income} />
      ) : (
        <AddExpensesButton animate={clicked.expenses} />
      )}
    </Div>
  );
};

export default DashBoard;
