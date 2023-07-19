import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Wrapper>
      <h1>TextBoard</h1>
      <Right>
        <SearchBar>
          <input type="text" placeholder="게시글 검색.." />
          <img src="/imgs/Search.svg" />
        </SearchBar>
        <Login>
          <h1>로그인</h1>
        </Login>
      </Right>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px gray;
  font-family: inter;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 340px;
  height: 45px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #efefef;
  font-family: inter;
  font-weight: 600;
  cursor: pointer;
  input {
    width: 250px;
    font-size: 20px;
    font-family: inter;
    font-weight: 600;
    border: none;
    background: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-family: inter;
      font-weight: 600;
      font-size: 15px;
    }
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Login = styled(Link)`
  display: flex;
  justify-content: center;
  width: 115px;
  height: 55px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 15px;
  background: #8b8b8b;
  text-decoration: none;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;
    background-color: #515151;
  }
  & > h1 {
    margin: 0;
    color: white;
    font-family: inter;
    font-weight: 600;
    font-size: 25px;
    text-decoration: none;
  }
`;
