import styled from 'styled-components';

import { EmptyBoxIcon } from '../assets/icons';

const Div = styled.div`
  color: #82868b;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    margin-top: 24px;
  }
`;

const EmptyState = (props) => {
  return (
    <Div>
      <EmptyBoxIcon />
      <p className="content">Your {props.type} list is empty.</p>
    </Div>
  );
};

export default EmptyState;
