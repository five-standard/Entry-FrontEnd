import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { TextBox } from '../components/common/TextBox';
import { Button } from '../components/common/Button';
import { getPosts } from '../apis/get/getPosts';

export const Main = () => {
  const [response, setResponse] = useState([]);
  const [count, setCount] = useState(0);
  const [leng, setLeng] = useState(0);
  const [cookies,] = useCookies();
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile

  /**
   * useEffect를 통해 글을 전부 불러온다.
   * 그 후 response는 응답 데이터로, leng은 배열의 길이를 5로 나눈 수로 설정한다
   * 여기서 배열의 길이가 1~5라면 leng=1, 6~10이라면 leng=2, 11~12라면.... 과 같다.
   */
  useEffect(() => {
    getPosts().then(res => { 
      setResponse(res.data); 
      setLeng(Math.ceil(res.data.length/5))
    })
  }, [])

  /**
   * 아까 받아왔던 길이만큼 페이지네이션 버튼을 생성한다.
   * @returns 페이지네이션 버튼 배열 ([<button>, <button>, ...])
   */
  const PaginationSet = () => {
    let arr = [];
    for(let i = 0; i<leng; i++) { arr.push( <button name="page" id={i} key={i} onClick={handleClick}>{i+1}</button> ); }
    return arr;
  }

  /**
   * 글들을 count(현재 페이지 수)에 따라 출력한다. (count*5를 통해 5개씩 출력한다)
   * @returns 글 버튼 배열 ([<div>, <div>, ...])
   */
  const PostSet = () => {
    let arr = [];
    for(let i = count*5; i<count*5+5; i++) {
      const tmp = response[i];
      if(tmp) { arr.push( <TextBox Title={tmp.title} Date={tmp.date} Author={tmp.author} Likes={tmp.likes.length} Id={tmp.id} key={tmp.id} /> ) }
    }
    return arr;
  }

  /**
   * 페이지네이션 버튼 클릭 이벤트
   * @event onClick
   */
  const handleClick = (e) => {
    if(e.target.name === "page") {
      setCount(Number(e.target.id));
    } else if(e.target.name === "previous") { 
      if(count>0) { setCount(count-1); }
    } else {
      if(count<leng-1) setCount(count+1);
    }
  }

  return <Wrapper>
    <Posts>
      {
        cookies.accessToken
        ? <Button To="/write" Text="글 작성하기" Width={isPc?220:160} Style={{alignSelf: "flex-end"}}/>
        : undefined
      }
      {
        response.length!==0 
        ? PostSet() 
        : undefined
      }
    </Posts>
    <Pagination pc={isPc}>
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
    box-sizing: border-box;
    color: black;
    font-size: ${props => props.pc?"23px":"16px"};
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