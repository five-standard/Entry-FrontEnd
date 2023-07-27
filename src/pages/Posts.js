import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getPostDtail } from '../apis/get/getPostDetail';

export const Posts = () => {  
  const { id } = useParams();
  const [response, setResponse] = useState({});

  useEffect(() => {
    getPostDtail(id)
      .then(res => {
        setResponse(res.data);
      })
  }, [id]) 

  return <Wrapper>
    <Post>
      <Top> 
        <div>
          <Title>{response.title}</Title>
          <h2>{response.author} | {response.date}</h2>
        </div>
        <Right>
          <h1>{response.likes}</h1>
          <img src="/imgs/Like.svg" alt="Likes"/>
          <img src="/imgs/Menu.svg"alt="Menu"/>
        </Right>
      </Top>
      <hr />
      <Data>{response.data}</Data>
    </Post>
    <Comment>
      <h1>총 <span>1개</span>의 댓글이 있습니다</h1>
      <div>
        <textarea />
        <button></button>
      </div>
      <ul>
        <li>six-standard - 안녕하세요</li>
      </ul>
    </Comment>
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 793px;
  margin-top: 60px;
`

const Post = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 { font-size: 25px; }
`;

const Right = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`;
const Data = styled.h1`
  font-size: 20px;
`;
const Title = styled.h1`
  font-size: 40px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  gap: 10px;
  height: 150px;
  margin-bottom: 20px;
  & > div {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 90%;
    height: 100%;
    & > textarea {
    border: 2px solid black;
    width: 90%;
    height: 100%;
    border-radius: 10px;
    resize: none;
    }
    & > button {
    width: 100px;
    height: 100%;
    }
  }
`;