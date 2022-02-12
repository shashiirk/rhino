import { useContext, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ThemeContext } from '../store/ThemeContext';

const Div = styled.div`
  &.dark {
    .date {
      background-color: #30363e;
      color: #e8e9ea;
    }

    .react-datepicker {
      background-color: #30363e;
      box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);

      .react-datepicker__header {
        background-color: #30363e;
        color: #e8e9ea;
        border-bottom: 1px #666666 solid;
        border-radius: 12px 12px 0 0;

        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: inherit;
        }
      }

      .react-datepicker__day {
        color: #e8e9ea;

        &:not(.react-datepicker__day--disabled):not(.react-datepicker__day--today):hover {
          background-color: #3d4248;
        }
      }

      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background-color: #30363e;
        color: #e8e9ea;
      }

      .react-datepicker__day--today {
        background-color: #4ca6ff;
        color: white;
      }

      .react-datepicker__day--disabled {
        color: #72777c;
      }
    }
  }

  .date {
    background-color: white;
    font: inherit;
    text-align: start;
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 12px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    .placeholder {
      color: #9ca3af;
    }
  }

  .react-datepicker {
    font-family: inherit;
    border: none;
    border-radius: 12px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    .react-datepicker__triangle {
      display: none;
    }

    .react-datepicker__header {
      background-color: white;
      border-bottom: 1px #cccccc solid;
      border-radius: 12px 12px 0 0;
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
      background-color: white;
      color: black;
    }

    .react-datepicker__day--today {
      background-color: #4ca6ff;
      color: white;
    }
  }
`;

const PickDate = (props) => {
  const [date, setDate] = useState(props.selected || null);

  const themeCtx = useContext(ThemeContext);

  const setDateHandler = (date) => {
    setDate(date);
    props.onChange(date);
  };

  return (
    <Div className={themeCtx.dark ? 'dark' : ''}>
      <DatePicker
        customInput={
          <button className="date" type="button">
            {!!date ? (
              date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            ) : (
              <span className="placeholder">Date</span>
            )}
          </button>
        }
        maxDate={new Date()}
        onChange={setDateHandler}
      />
    </Div>
  );
};

export default PickDate;
