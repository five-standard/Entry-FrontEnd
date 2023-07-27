import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    font-family: inter;
  }
  a { 
    color: #000000; 
    text-decoration: none;
  }
`;

export default GlobalStyle;