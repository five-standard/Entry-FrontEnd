import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextBox from '../components/common/TextBox';
import { useState, useEffect } from 'react';
import { getPosts } from '../apis/get/getPosts';

const Main = () => {
  const [response, setResponse] = useState([]);
  const [resLeng, setResLeng] = useState(1);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    getPosts(count)
      .then(res => {
        setResponse(res.data);
      })
  }, [count]);

  const editcount = () => {

  }

  const previous = () => {
    if(count>0) setCount(count-1);
  }

  const next = () => {
    if(count<resLeng) setCount(count+1);
  }

  return <Wrapper>
    <Posts>
      <Write>
        <h1>글 작성하기</h1>
      </Write>
      {
        response?.map(data => {
          return (
            <TextBox Title={data.title} Date={data.date} Author={data.author} Id={data.id} key={data.id} />
          )
        })
      }
    </Posts>
    <Pagination>
      <button onClick={previous}>〈</button>
      <button onClick={next}>〉</button>
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
  width: 65%;
  flex-direction: column;
  align-items: center;
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
