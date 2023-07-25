import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPostDtail } from '../apis/get/getPostDetail';

const Posts = () => {  
  const { id } = useParams();
  const [response, setResponse] = useState({});

  useEffect(() => {
    getPostDtail(id)
      .then(res => {
        setResponse(res.data);
      })
  }, [])

  return <Wrapper>
    <Post>
      <Info>
        <Title>{response.title}</Title>
        <UserInfo>
          <h1>{response.author}</h1>
          <Line />
          <h1>{response.date}</h1>
        </UserInfo>
      </Info>
      <hr />
      <Data>{response.data}</Data>
    </Post>
    <Comment>
      <textarea></textarea>
      <button></button>
    </Comment>
  </Wrapper>
};

export default Posts;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  height: 793px;
  justify-content: space-between;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
`;

const Info = styled.div`
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & > h1 {
    font-size: 25px;
  }
`;

const Line = styled.div`
  width: 2px;
  height: 30px;
  background-color: black;
`;

const Data = styled.h1`
  font-size: 20px;
`;
const Title = styled.h1`
  font-size: 40px;
`;

const Comment = styled.div`
  display: flex;
  width: 70%;
  gap: 10px;
  height: 100px;
  margin-bottom: 20px;
  & > textarea {
    border: 2px solid black;
    width: 86%;
    border-radius: 10px;
    resize: none;
  }
  & > button {
    width: 100px;
  }
`;