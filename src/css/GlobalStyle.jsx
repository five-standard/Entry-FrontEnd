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
  li {
    list-style: none;
  }
`;

export default GlobalStyle;