import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  /* border: 1px red solid; */
  margin: auto;

  h1 {
    text-align: center;
    font-size: 120px;
    font-weight: 600;
  }

  p {
    text-align: center;
    margin-bottom: 30px;
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

const Error = () => {
  const navigate = useNavigate();

  const goHomeHandler = () => {
    navigate('', { replace: true });
  };

  return (
    <Div>
      <h1>404.</h1>
      <p>The page you're looking for cannot be found.</p>
      <button onClick={goHomeHandler}>Go Home</button>
    </Div>
  );
};

export default Error;
