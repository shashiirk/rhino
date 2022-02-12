import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => (props.dark ? '#202831' : '#f6f4f7')};
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    -webkit-tap-highlight-color: transparent;
  }
`;

export default GlobalStyle;
