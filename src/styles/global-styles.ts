import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
      font-family: sans-serif;
      text-align: left;
      padding:20px;
  }
  label {
       font-weight: bold;
  }
  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: sans-serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
