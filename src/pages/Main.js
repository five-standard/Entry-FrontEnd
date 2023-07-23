import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextBox from '../components/common/TextBox';

const Main = () => {
  return <Wrapper>
    <Posts>
      <Write>
        <h1>글 작성하기</h1>
      </Write>
      <TextBox Title="안녕하세요" Date="2023-07-20" Author="Six-standard" />
      <TextBox Title="안녕하세요" Date="2023-07-20" Author="Six-standard" />
      <TextBox Title="안녕하세요" Date="2023-07-20" Author="Six-standard" />
      <TextBox Title="안녕하세요" Date="2023-07-20" Author="Six-standard" />
      <TextBox Title="안녕하세요" Date="2023-07-20" Author="Six-standard" />
    </Posts>
    <Pagination>
      <button>〈</button>
      <button>1</button>
      <button>〉</button>
    </Pagination>
  </Wrapper>
};

export default Main;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  & > button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: bolder;
    &:hover {
      border: 1px solid black;
    }
  }
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Write = styled(Link)`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  box-sizing: border-box;
  background: gray;
  width: 220px;
  padding: 10px;
  border-radius: 15px;
  text-decoration: none;
  color: white;
  transition: 0.2s;
  & > h1 {
    font-size: 25px;
  }
  &:hover {
    transition: 0.2s;
    background: #515151;
  }
`;
