import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [cookies, setCookie, removeCookie] = useCookies()
  
  //해당 부분 Recoil로 대체 예정
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleEnter = (e) => {
    if(e.key === "Enter") navigate("/search");
  }

  return <Wrapper>
    <Title to="/"><h1>TextBoard</h1></Title>
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
        : <img src="/imgs/Profile.svg" alt=""/> //로그인했을 시 아이콘 표시
      }
    </Right>
  </Wrapper>
};

export default Header;

const Wrapper = styled.div`
  //Flex
  display: flex;
  align-items: center;
  justify-content: space-between;
  //도형 크기
  width: 100%;
  height: 70px;
  //기타 형태
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px gray;

`;

const SearchBar = styled.div`
  //Flex
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  //도형 크기
  width: 340px;
  height: 45px;
  //기타 형태
  cursor: text;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #efefef;
  //폰트
  font-weight: 600;
  & * { cursor: text; outline: none; }
  &> input {
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

  text-decoration: none;

  &:hover {
    transition: 0.2s;
    background-color: #515151;
  }
  & > h1 {
    margin: 0;
    color: white;
    font-size: 25px;
    font-weight: 600;
    text-decoration: none;
  }
`

const Title = styled(Link)`
  color: black;
  text-decoration: none;
`
