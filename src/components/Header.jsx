import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
  const [cookies, setCookie] = useCookies();
  const [search, setSearch] = useState("");

  const handleEnter = (e) => {
    if(e.key === "Enter") window.location.href = `/search/${search}`;
  };

  return <Wrapper>
    <a href="/"><h1>TextBoard</h1></a>
    <Right>
      <label htmlFor="Search">
        <SearchBar>
          <input id="Search" type="text" placeholder="게시글 검색.." onChange={(e) => setSearch(e.target.value)} onKeyDown={handleEnter}/>
          <img src="/imgs/Search.svg" alt="icon" />
        </SearchBar>
      </label>
      {
        !cookies.accessToken
        ? <Login to="/login"> <h1>로그인</h1> </Login> //로그인하지 않았을 시 로그인 버튼 표시
        : <img src="/imgs/Profile.svg" alt="Profile"/> //로그인했을 시 아이콘 표시 (버튼 기능은 곧 구현 예정)
      }
    </Right>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px gray;
`

const SearchBar = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 340px;
  height: 45px;
  cursor: text;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #efefef;
  font-weight: 600;
  & * { cursor: text; outline: none; }
  & > input {
    width: 250px;
    border: none;
    background: none;
    font-size: 20px;
    font-weight: 600;
    &::placeholder {
      font-size: 15px;
      font-weight: 600;
      color: #b6b6b6;
    }
  }
`

const Right = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 55px;
    height: 55px;
    &:hover { cursor: pointer; }
  }
`

const Login = styled(Link)`
  display: flex;
  justify-content: center;
  width: 115px;
  height: 55px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 15px;
  background: #8b8b8b;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;
    background-color: #515151;
  }
  & > h1 {
    color: #ffffff;
    font-size: 25px;
    font-weight: 600;
  }
`