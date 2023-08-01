import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = ({ Text, Width, Height, Click, To, Style }) => {
  return <Wrapper Width={Width} Height={Height} onClick={Click} to={To?To:undefined} style={Style?Style:undefined}>
    <h1>{Text}</h1>
  </Wrapper>
}

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.Width ? `${props.Width}px` : "max-content")};
  height: ${props => (props.Height ? `${props.Height}px` : "max-content")};
  padding: 10px;
  transition: 0.2s;
  user-select: none;
  border-radius: 15px;
  background: #8b8b8b;
  box-sizing: border-box;
  &:hover {
    transition: 0.2s;
    background-color: #515151;
  }
  & > h1 {
    color: #ffffff;
    font-size: 25px;
    font-weight: bolder;
  }
`