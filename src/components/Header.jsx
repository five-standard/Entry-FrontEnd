import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
  const [cookies, , removeCookie] = useCookies();
  const [search, setSearch] = useState("");

  const handleEnter = (e) => {
    if(e.key === "Enter") window.location.href = `/search/${search}`;
  };

  const handleLogOut = (e) => {
    removeCookie("accessToken");
    removeCookie("name");
    window.location.href = "/";
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
        : <LogOut title="클릭시 로그아웃합니다." onClick={handleLogOut}>
            <h1>{cookies.name}</h1>
            <img src="/imgs/Profile.svg" alt="Profile"/>
          </LogOut>
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
`

const Login = styled(Link)`
  display: flex;
  justify-content: center;
  width: 115px;
  height: 55px;
  padding: 10px;
  transition: 0.2s;
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
    font-weight: 600;
  }
`

const LogOut = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  padding: 5px;
  transition: 0.2s;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 15px;
  background: #8b8b8b;
  box-sizing: border-box;
  color: #ffffff;
  & > img {
    width: 45px;
    height: 45px;
  }
  & > h1 { font-size: 25px; }
  &:hover { 
    cursor: pointer; 
    transition: 0.2s;
    background-color: #515151;
  }
`