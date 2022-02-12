import styled from 'styled-components';

const Div = styled.div`
  margin: auto;

  h1 {
    text-align: center;
    font-size: 72px;
    font-weight: 600;
  }

  p {
    text-align: center;
    margin: 14px 0 30px;
  }

  button {
    display: block;
    font: inherit;
    font-weight: 500;
    border-radius: 12px;
    border: none;
    padding: 16px 32px;
    margin: auto;
    background: linear-gradient(120deg, #4ca6ff 15%, #e544e5, #ffa54c);
    color: white;
    transition: transform 240ms ease;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        transform: scale(0.95);
      }
    }

    @media (hover: none) {
      &:active {
        transform: scale(0.95);
      }
    }
  }
`;

const Offline = () => {
  const tryAgainHandler = () => {
    window.location.reload();
  };

  return (
    <Div>
      <h1>Offline.</h1>
      <p>
        It seems there is a problem with your connection. Please check your
        status.
      </p>
      <button onClick={tryAgainHandler}>Try again</button>
    </Div>
  );
};

export default Offline;
