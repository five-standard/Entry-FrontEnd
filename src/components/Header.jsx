// 완성
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { Button } from './common/Button';

export const Header = () => {
  const [search, setSearch] = useState("");
  const [cookies,] = useCookies();
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile
  const navigate = useNavigate();

  const handleSearch = () => { 
    if(search!=="") { window.location.href = `/search/${search}`; }
    else { alert("검색어를 입력해주세요"); }
  }

  const handleLogOut = () => { //2뎁스 이상의 페이지에서 로그아웃 되지 않는 오류 해결
    document.cookie = "accessToken=; expires=0; path=/;";
    document.cookie = "name=; expires=0; path=/;";
    window.location.reload();
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleEnter = (e) => {
    if(e.key==="Enter") { handleSearch(); }
  }

  return <Wrapper pc={isPc}>
    <Title onClick={() => navigate("/")}>TextBoard</Title>
    <Right pc={isPc}>
      <label htmlFor="search">
        <SearchBar pc={isPc} onClick={() => !isPc?(window.location.href = "/search/ "):undefined}>
          <input id="search" placeholder="게시글 검색.." onChange={handleChange} onKeyDown={handleEnter} />
          <img src="/imgs/Search.svg" alt="" />
        </SearchBar>
      </label>
      {
        !cookies.accessToken
        ? <Button To="/login" Text="로그인" Width={isPc?130:100} Height={55} />
        : <>
          <LogOut title="클릭시 로그아웃합니다." onClick={handleLogOut} pc={isPc}>
            <h1>{cookies.name}</h1>
            <img src="/imgs/Profile.svg" alt="" width="45px" height="45px" />
          </LogOut>
        </>
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
  padding-left: ${props => props.pc?"30px":"10px"};
  padding-right: ${props => props.pc?"30px":"10px"};
  transition: 0.2s;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px gray;
`

const SearchBar = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.pc?"340px":"50px"};
  height: 45px;
  cursor: text;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #efefef;
  font-weight: 600;
  & * { cursor: text; } //검색바 전체의 커서를 text로 변경
  & > input { //실질적인 검색바
    display: ${props => props.pc?"block":"none"};
    width: 250px;
    font-size: 20px;
    &::placeholder { //내부 텍스트 (게시글 검색..)
      font-size: 15px;
      color: #b6b6b6;
    }
  }
`

const Right = styled.div`
  gap: ${props => props.pc?"30px":"10px"};
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
  & > h1 {
    display: ${props => props.pc?"block":"none"};
    font-size: 25px;
    color: #ffffff;
  }
  &:hover {  //호버시 버튼 배경색 변경
    transition: 0.2s;
    background-color: #515151;
  }
`

const Title = styled.h1` cursor: pointer; `