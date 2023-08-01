import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { searchPosts } from '../apis/get/searchPosts';
import { TextBox } from '../components/common/TextBox';

export const Search = () => {
  const { search } = useParams();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    searchPosts(search)
    .then(res => { setResponse(res.data); })
  }, [search])

  return <Wrapper>
    <Result>검색 결과 <span>{response.length}건</span>이 존재합니다.</Result>
    <Posts>
      {
        response?.map(({title, date, likes, id, author}, index) => { 
          return ( <TextBox Title={title} Date={date} Likes={likes} Id={id} Author={author} key={index}/> )
        })
      }
    </Posts>
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
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

const Result = styled.h1`
  color: gray;
  font-size: 30px;
  & > span { color: black; }
`