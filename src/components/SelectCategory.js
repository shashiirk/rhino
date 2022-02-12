import { useContext } from 'react';
import Select from 'react-select';

import { ThemeContext } from '../store/ThemeContext';

const INCOME_CATEGORIES = [
  { value: 'salary', label: 'Salary' },
  { value: 'cash', label: 'Cash' },
  { value: 'bank', label: 'Bank' },
  { value: 'interest', label: 'Interest' },
  { value: 'gift', label: 'Gift' },
  { value: 'dividends', label: 'Dividends' },
  { value: 'other', label: 'Other' },
];

const EXPENSES_CATEGORIES = [
  { value: 'bills', label: 'Bills' },
  { value: 'grocery', label: 'Grocery' },
  { value: 'food', label: 'Food' },
  { value: 'home', label: 'Home' },
  { value: 'transport', label: 'Transport' },
  { value: 'personal', label: 'Personal' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'banking', label: 'Banking' },
  { value: 'occation', label: 'Occation' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'childcare', label: 'Childcare' },
  { value: 'petcare', label: 'Petcare' },
  { value: 'recreational', label: 'Recreational' },
  { value: 'taxes', label: 'Taxes' },
  { value: 'other', label: 'Other' },
];

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    borderRadius: '12px',
    padding: '14px 6px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    zIndex: 10,
  }),
  menuList: (provided) => ({
    ...provided,
    border: 'none',
    borderRadius: '12px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#4ca6ff' : 'white',
    padding: '10px 16px',
    cursor: 'pointer',
    ':active': {
      ...provided[':active'],
      backgroundColor: state.isSelected ? '#4ca6ff' : '#f4f4f4',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
  }),
};

const customSelectStylesDarkMode = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    borderRadius: '12px',
    padding: '14px 6px',
    boxShadow: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
    backgroundColor: '#30363e',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#e8e9ea',
  }),
  dropdownIndicator: customSelectStyles.dropdownIndicator,
  indicatorSeparator: customSelectStyles.indicatorSeparator,
  menu: (provided) => ({
    ...provided,
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
    zIndex: 10,
    backgroundColor: '#30363e',
  }),
  menuList: (provided) => ({
    ...provided,
    border: 'none',
    borderRadius: '12px',
    backgroundColor: '#30363e',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#4ca6ff' : '#30363e',
    padding: '10px 16px',
    cursor: 'pointer',
    ':active': {
      ...provided[':active'],
      backgroundColor: state.isSelected ? '#4ca6ff' : '#3d4248',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
  }),
};

const SelectCategory = (props) => {
  const themeCtx = useContext(ThemeContext);

  const handleSelectChange = (option) => {
    props.onChange(option.value);
  };

  return (
    <Select
      isSearchable={false}
      onChange={handleSelectChange}
      options={
        props.type === 'income' ? INCOME_CATEGORIES : EXPENSES_CATEGORIES
      }
      placeholder={'Category'}
      value={
        props.type === 'income'
          ? INCOME_CATEGORIES.filter((option) => option.value === props.value)
          : EXPENSES_CATEGORIES.filter((option) => option.value === props.value)
      }
      styles={themeCtx.dark ? customSelectStylesDarkMode : customSelectStyles}
    />
  );
};

export default SelectCategory;
