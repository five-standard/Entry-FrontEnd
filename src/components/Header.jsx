import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { Button } from './common/Button';

export const Header = () => {
  const [cookies, , removeCookie] = useCookies();
  const [search, setSearch] = useState("");

  const handleSearch = () => { 
    if(search!=="") { window.location.href = `/search/${search}`; }
    else { alert("검색어를 입력해주세요"); }
  }

  const handleLogOut = (e) => {
    removeCookie("accessToken");
    removeCookie("name");
    window.location.href = "/";
  }

  return <Wrapper>
    <a href="/"><h1>TextBoard</h1></a>
    <Right>
      <label htmlFor="search">
        <SearchBar>
          <input id="search" placeholder="게시글 검색.." onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key==="Enter") handleSearch()}}/>
          <img src="/imgs/Search.svg" alt="icon" />
        </SearchBar>
      </label>
      {
        !cookies.accessToken ?
        <Button To="/login" Text="로그인" Width={130} Height={55} />:
        <LogOut title="클릭시 로그아웃합니다." onClick={handleLogOut}>
            {cookies.name}
            <img src="/imgs/Profile.svg" alt="Profile" width="45px" height="45px"/>
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
  & * { cursor: text; } //검색바 전체의 커서를 text로 변경
  & > input { //실질적인 검색바
    width: 250px;
    font-size: 20px;
    &::placeholder { //내부 텍스트 (게시글 검색..)
      font-size: 15px;
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
const LogOut = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer; 
  transition: 0.2s;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 15px;
  background: #8b8b8b;
  box-sizing: border-box;
  font-size: 25px;
  color: #ffffff;
  &:hover {  //호버시 버튼 배경색 변경
    transition: 0.2s;
    background-color: #515151;
  }
`