import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { TextBox } from '../components/common/TextBox';
import { useState, useEffect } from 'react';
import { getPosts } from '../apis/get/getPosts';
import { useCookies } from 'react-cookie';

export const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [response, setResponse] = useState([]);
  const [resLeng, setResLeng] = useState(0);
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
        {
          cookies.accessToken
          ?<Write to="/write">
            <h1>글 작성하기</h1>
          </Write>
          :<Margin />
        }
      {
        response?.map(data => {
          return (
            <TextBox Title={data.title} Date={data.date} Author={data.author} Likes={data.likes} Id={data.id} key={data.id} />
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`

const Pagination = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  & > button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: bolder;
    &:hover { border: 1px solid black; }
  }
`

const Posts = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60%;
`

const Margin = styled.div` height: 53px; `

const Write = styled(Link)`
  display: flex;
  align-self: flex-end;
  justify-content: center;
  width: 220px;
  padding: 10px;
  background: gray;
  transition: 0.2s;
  border-radius: 15px;
  box-sizing: border-box;
  color: white;
  text-decoration: none;
  & > h1 { font-size: 25px; }
  &:hover {
    transition: 0.2s;
    background: #515151;
  }
`
