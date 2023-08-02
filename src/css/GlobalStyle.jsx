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
  input {
    border: none;
    outline: none;
    background: none;
    font-weight: bolder;
  }
  textarea {
    border: none;
    resize: none;
    outline: none;
    font-weight: bolder;
    background: none;
  }
  button {
    border: none;
    font-weight: bolder;
  }
  ul {
    padding-inline-start: 0;
  }
`;

export default GlobalStyle;