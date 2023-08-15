import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { regPost } from '../apis/post/regPost';

export const Write = () => {
  const date = new Date();
  const [cookies,] = useCookies();
  const [input, setInput] = useState({
    title: "",
    author: `${cookies.name}`,
    date: `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    data: "",
    comments: [],
    likes: []
  });
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile
  const navigate = useNavigate();

  const handleChange = (e) => { //입력값 변경 감지
    const {value, name} = e.target;
    setInput({...input, [name]: value});
  }
  
  /**
   * 글 등록 버튼 클릭이벤트
   * 만약 응답이 돌아온다면 alert창 출력 후, 메인 페이지로 이동한다.
   * @event onClick
   */
  const handleClick = () => {
    regPost(input).then(res => {
      if(res) {
        alert("글이 정상적으로 등록되었습니다.");
        navigate("/");
      }
    })
  }

  return <Wrapper>
    <WritePost>
      <Form pc={isPc}>
        <input placeholder="제목을 입력해주세요" name="title" onChange={handleChange}/>
        <hr />
        <textarea placeholder="내용을 입력해주세요" name="data" onChange={handleChange}/>
      </Form>
      <Button Text="글 등록" Click={handleClick} Width={isPc?200:130} Height={50} Style={{alignSelf: "flex-end"}} />
    </WritePost>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 853px;
`

const WritePost = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid black;
  & > input {
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: inherit;
    font-size: ${props => props.pc?"30px":"25px"};
  }
  & > textarea {
    height: 600px;
    padding: 10px;
    border-radius: inherit;
    font-size: ${props => props.pc?"20px":"15px"};
    font-weight: bolder;
  }
`