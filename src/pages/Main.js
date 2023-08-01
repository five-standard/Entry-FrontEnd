import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { TextBox } from '../components/common/TextBox';
import { getPostsCount } from '../apis/get/getPostAll';
import { getPosts } from '../apis/get/getPosts';
import { Button } from '../components/common/Button';

export const Main = () => {
  const [cookies, ,] = useCookies()
  const [response, setResponse] = useState([]);
  const [resLeng, setResLeng] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getPosts(count).then(res => { setResponse(res.data); })
    getPostsCount().then(res => { setResLeng(Math.ceil(res/5));
  })
  }, [count]);

  const paginationSet = () => {
    let arr = [];
    for(let i = 0; i<resLeng; i++) { arr.push( <button name="page" id={i} key={i} onClick={handleClick}>{i+1}</button> ); }
    return arr;
  }

  const handleClick = (e) => {
    if(e.target.name === "page") 
      setCount(e.target.id);
    else if(e.target.name === "previous") 
      if(count>0) setCount(count-1);
    else if(e.target.name === "next")
      if(count<resLeng-1) setCount(count+1);
  }

  return <Wrapper>
    <Posts>
      {
        cookies.accessToken?
        <Button To="/write" Text="글 작성하기" Width={220} Style={{alignSelf: "flex-end"}}/>:
        <Margin />
      }
      {
        response?.map(data => {
          return ( <TextBox Title={data.title} Date={data.date} Author={data.author} Likes={data.likes} Id={data.id} key={data.id} /> )
        })
      }
    </Posts>
    <Pagination>
      <button name="previous" onClick={handleClick}>〈</button>
      { paginationSet() }
      <button name="next" onClick={handleClick}>〉</button>
    </Pagination>
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 853px;
`

const Pagination = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  & > button { //페이지네이션 버튼 (<, 1, 2, 3, >)
    width: 40px;
    height: 40px;
    background: #EFEAEA;
    border-radius: 10px;
    font-size: 20px;
    &:hover { border: 1px solid black; } //버튼 호버시 테두리 생성
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