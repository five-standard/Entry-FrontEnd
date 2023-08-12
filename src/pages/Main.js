import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { TextBox } from '../components/common/TextBox';
import { Button } from '../components/common/Button';
import { getPosts } from '../apis/get/getPosts';

export const Main = () => {
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState([]);
  const [leng, setLeng] = useState(0);
  const [cookies,] = useCookies();

  useEffect(() => {
    getPosts().then(res => { 
      setResponse(res.data); 
      setLeng(Math.ceil(res.data.length/5))
    })
  }, [])

  const PaginationSet = () => {
    let arr = [];
    for(let i = 0; i<leng; i++) {
      arr.push( <button name="page" id={i} key={i} onClick={handleClick}>{i+1}</button> ); 
    }
    return arr;
  }

  const PostSet = () => {
    let arr = [];
    for(let i = count*5; i<count*5+5; i++) {
      const tmp = response[i];
      if(tmp) {
        arr.push( <TextBox Title={tmp.title} Date={tmp.date} Author={tmp.author} Likes={tmp.likes} Id={tmp.id} key={tmp.id} /> )
      }
    }
    return arr;
  }

  const handleClick = (e) => {
    if(e.target.name === "page") 
      setCount(e.target.id);
    else if(e.target.id === "previous") 
      if(count>0) setCount(count-1);
    else if(e.target.id === "next")
      if(count<leng-1) setCount(count+1);
  }

  return <Wrapper>
    <Posts>
      {
        cookies.accessToken?
        <Button To="/write" Text="글 작성하기" Width={220} Style={{alignSelf: "flex-end"}}/>:
        <Margin />
      }
      {
        response.length!==0 ? PostSet() : undefined
      }
    </Posts>
    <Pagination>
      <button name="previous" onClick={handleClick}>〈</button>
      { PaginationSet(leng) }
      <button name="next" onClick={handleClick}>〉</button>
    </Pagination>
  </Wrapper>
}

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