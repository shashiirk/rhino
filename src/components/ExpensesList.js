import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  ActionAnimations,
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { doc, deleteDoc } from 'firebase/firestore';

import { DeleteIcon, EditIcon } from '../assets/icons';
import { colorPicker } from '../services/utils';
import { getFormattedCurrency } from '../services/utils';
import { getFormattedDate } from '../services/utils';
import { db } from '../services/firebase-config';
import { AuthContext } from '../store/AuthContext';
import { ThemeContext } from '../store/ThemeContext';
import { EditItemContext } from '../store/EditItemContext';
import EmptyState from './EmptyState';

const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Div = styled.div`
  flex: 1;
  display: flex;
  animation: ${fade} 240ms ease;

  &.dark {
    .swipeable-list {
      background-color: #30363e;

      .swipeable-list-item {
        background-color: #30363e;
        border-bottom: 1px #363d45 solid;

        .swipeable-list-item__content {
          background-color: #30363e;
        }

        .box-2 {
          .date {
            color: #92969a;
          }
        }
      }
    }
  }

  .swipeable-list {
    list-style-type: none;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    .swipeable-list-item {
      border-bottom: 1px #f6f4f7 solid;
      background-color: white;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: grab;

      &:last-of-type {
        border-bottom: none;
      }

      .swipeable-list-item__content-right {
        background-color: #ec0000;
        /* background-color: white; */

        .icon {
          color: white;
          margin-left: 16px;
        }
      }

      .swipeable-list-item__content-left {
        background-color: #009c00;
        /* background-color: white; */

        .icon {
          color: white;
          margin-right: 16px;
        }
      }

      .swipeable-list-item__content {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 12px;
      }

      .box-1 {
        display: flex;
        align-items: center;

        .icon {
          width: 44px;
          height: 44px;
          margin-right: 8px;
          border-radius: 50%;

          &.amber {
            background: linear-gradient(to right, #fbbf24, #d97706);
          }

          &.yellow {
            background: linear-gradient(to right, #fde047, #eab308);
          }

          &.pink {
            background: linear-gradient(to right, #f472b6, #db2777);
          }

          &.red {
            background: linear-gradient(to right, #f87171, #dc2626);
          }

          &.lime {
            background: linear-gradient(to right, #a3e635, #65a30d);
          }

          &.green {
            background: linear-gradient(to right, #4ade80, #16a34a);
          }

          &.emerald {
            background: linear-gradient(to right, #34d399, #059669);
          }

          &.teal {
            background: linear-gradient(to right, #5eead4, #14b8a6);
          }

          &.cyan {
            background: linear-gradient(to right, #67e8f9, #06b6d4);
          }

          &.sky {
            background: linear-gradient(to right, #38bdf8, #0284c7);
          }

          &.blue {
            background: linear-gradient(to right, #60a5fa, #2563eb);
          }

          &.indigo {
            background: linear-gradient(to right, #818cf8, #4f46e5);
          }

          &.orange {
            background: linear-gradient(to right, #fb923c, #ea580c);
          }

          &.purple {
            background: linear-gradient(to right, #c084fc, #9333ea);
          }

          &.violet {
            background: linear-gradient(to right, #a78bfa, #7c3aed);
          }

          &.fuchsia {
            background: linear-gradient(to right, #e879f9, #c026d3);
          }
        }

        .note {
          font-weight: 500;
        }
      }

      .box-2 {
        text-align: end;

        .amount {
          margin-bottom: 4px;
        }

        .date {
          color: #9ca3af;
          font-size: 14px;
        }
      }
    }

    .node-exit {
      opacity: 1;
    }

    .node-exit-active {
      opacity: 0;
      max-height: 0;
      transition: max-height 800ms, opacity 1200ms;
    }

    .node-enter {
      opacity: 0;
      max-height: 0;
    }

    .node-enter-active {
      opacity: 1;
      max-height: 1000px;
      transition: max-height 800ms, opacity 1200ms;
    }
  }
`;

const ExpensesList = (props) => {
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);
  const editItemCtx = useContext(EditItemContext);

  const navigate = useNavigate();

  const swipeRightOptions = (id) => ({
    content: (
      <div className="delete-slot">
        <DeleteIcon />
      </div>
    ),
    actionAnimation: ActionAnimations.REMOVE,
    action: () => {
      deleteDoc(doc(db, authCtx.user.uid, id)).catch((error) => {
        console.log(error);
      });
    },
  });

  const swipeLeftOptions = (item) => ({
    content: (
      <div className="edit-slot">
        <EditIcon />
      </div>
    ),
    actionAnimation: ActionAnimations.RETURN,
    action: () => {
      editItemCtx.setItem(item);
      navigate('/edit-expenses');
    },
  });

  const threshold = 0.33;
  const transitionTimeout = 1200;

  return (
    <Div className={themeCtx.dark ? 'dark' : ''}>
      {props.items.length > 0 ? (
        <SwipeableList className="swipeable-list" threshold={threshold}>
          {({
            className,
            scrollStartThreshold,
            swipeStartThreshold,
            threshold,
          }) => (
            <TransitionGroup className={className} enter={true} exit={true}>
              {props.items.map((item, index) => (
                <CSSTransition
                  classNames="node"
                  key={item.id}
                  timeout={transitionTimeout}
                >
                  <SwipeableListItem
                    key={item.id}
                    className="swipeable-list-item"
                    swipeLeft={swipeLeftOptions(item)}
                    swipeRight={swipeRightOptions(item.id)}
                    scrollStartThreshold={scrollStartThreshold}
                    swipeStartThreshold={swipeStartThreshold}
                    threshold={threshold}
                  >
                    <div className="box-1">
                      <div
                        className={`icon ${colorPicker(item.category)}`}
                      ></div>
                      <p className="note">{item.note}</p>
                    </div>
                    <div className="box-2">
                      <p className="amount">{`- ${getFormattedCurrency(
                        item.amount
                      )}`}</p>
                      <p className="date">{getFormattedDate(item.date)}</p>
                    </div>
                  </SwipeableListItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </SwipeableList>
      ) : (
        <EmptyState type="expenses" />
      )}
    </Div>
  );
};

export default ExpensesList;
