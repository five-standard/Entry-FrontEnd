import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import React, { useState } from 'react';
import { regPost } from '../apis/post/regPost';
import { Button } from '../components/common/Button';

export const Write = () => {
  const date = new Date();
  const [cookies,] = useCookies();
  const [input, setInput] = useState({
    title: "",
    author: `${cookies.name}`,
    date: `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    data: "",
    comments: [],
    likes: 0
  });

  const handleChange = (e) => {
    const {value, name} = e.target;
    setInput({...input, [name]: value});
  }
  
  const handleClick = () => {
    regPost(input).then(res => {
      if(res) { window.location.href = "/"; }
    })
  }

  return <Wrapper>
    <WritePost>
      <Form>
        <input placeholder="제목을 입력해주세요" name="title" onChange={handleChange}/>
        <hr />
        <textarea placeholder="내용을 입력해주세요" name="data" onChange={handleChange}/>
      </Form>
      <Button Text="글 등록" Click={handleClick} Width={200} Height={50} Style={{alignSelf: "flex-end"}} />
    </WritePost>
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 853px;
`;

const WritePost = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
`;

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
    font-size: 30px;
  }
  & > textarea {
    height: 600px;
    padding: 10px;
    border-radius: inherit;
    font-size: 20px;
    font-weight: bolder;
  }
`;