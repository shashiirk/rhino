import AddButtonTemplate from './AddButtonTemplate';

const AddExpensesButton = (props) => {
  return <AddButtonTemplate type="expenses" animate={props.animate} />;
};

export default AddExpensesButton;
