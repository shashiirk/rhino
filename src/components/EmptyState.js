import styled from 'styled-components';

const Div = styled.div`
  color: #82868b;
  margin: auto;

  p {
    text-align: center;
  }
`;

const EmptyState = (props) => {
  return (
    <Div>
      <p>Your {props.type} list is empty.</p>
    </Div>
  );
};

export default EmptyState;
