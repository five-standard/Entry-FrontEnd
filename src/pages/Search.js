import React from 'react';
import styled from 'styled-components';
import TextBox from '../components/common/TextBox';
/*import { Link } from 'react-router-dom';*/

const Search = () => {
  return <Wrapper>
    <Result>검색 결과 <span>2건</span>이 존재합니다.</Result>
    <Posts>
      <TextBox Title="안녕하세요" Date="2023-07-20" Author="Six-standard" />
      <TextBox Title="안녕하세요" Date="2023-07-20" Author="Six-standard" />
    </Posts>
  </Wrapper>
};

export default Search;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const Result = styled.h1`
  font-size: 30px;
  color: gray;
  margin: 0;
  & > span {
    color: black;
  }
`;