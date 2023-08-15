import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { searchPosts } from '../apis/get/searchPosts';
import { TextBox } from '../components/common/TextBox';
import { useMediaQuery } from 'react-responsive';

export const Search = () => {
  const [response, setResponse] = useState([]);
  const [search, setSearch] = useState("");
  const isPc = useMediaQuery({ query: "(min-width: 820px)" });
  const { data } = useParams();

  /**
   * useEffect를 통해 검색 결과를 불러온다.
   * 그 후 response는 응답 데이터로 설정한다.
   */
  useEffect(() => {
    searchPosts(data).then(res => { 
      setResponse(res.data); 
    })
  }, [])

  /**
   * 검색바 엔터 감지 이벤트 (모바일용)
   * 검색어 입력 후 엔터키를 누를 시 검색 결과를 표시하는 페이지로 이동한다.
   * @event onKeyDown
   */
  const handleKeyDown = (e) => {
    if(e.key==="Enter") { window.location.href = `/search/${search}`; }
  }

  const handleChange = (e) => { //검색바 값 변경 감지 (모바일용)
    setSearch(e.target.value);
  }

  return <Wrapper>
    <Top>
      <SearchBar pc={isPc}>
        <input id="search" placeholder="게시글 검색.." onChange={handleChange} onKeyDown={handleKeyDown}/>
        <img src="/imgs/Search.svg" alt="" />
      </SearchBar>
      <Result pc={isPc}>검색 결과 <span>{response.length}건</span>이 존재합니다.</Result>
    </Top>
    <Posts>
      {
        response?.map(({title, date, likes, id, author}, index) => { 
          return ( <TextBox Title={title} Date={date} Likes={likes} Id={id} Author={author} key={index}/> )
        })
      }
    </Posts>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
`

const Top = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
`

const Posts = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 20px;
  margin-top: 30px;
  box-sizing: border-box;
`

const SearchBar = styled.div`
  gap: 10px;
  display: ${props => props.pc?"none":"flex"};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: text;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #efefef;
  font-weight: 600;
  & * { cursor: text; } //검색바 전체의 커서를 text로 변경
  & > input { //실질적인 검색바
    width: 100%;
    font-size: 20px;
    &::placeholder { //내부 텍스트 (게시글 검색..)
      font-size: 15px;
      color: #b6b6b6;
    }
  }
`

const Result = styled.h1`
  color: gray;
  font-size: ${props => props.pc?"35px":"20px"};
  & > span { color: black; }
`