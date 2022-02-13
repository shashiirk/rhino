import styled from 'styled-components';

const Div = styled.div`
  margin: auto;

  h1 {
    text-align: center;
    font-size: 96px;
    font-weight: 600;
  }

  p {
    text-align: center;
    margin: 14px 0 30px;
  }
`;

const Offline = () => {
  return (
    <Div>
      <h1>:/</h1>
      <p>
        It seems there is a problem with your connection. Please check your
        network status.
      </p>
    </Div>
  );
};

export default Offline;
