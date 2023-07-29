import { styled } from 'styled-components';
import React from 'react';
import { useState } from 'react';
import { regPost } from '../apis/post/regPost';
import { useCookies } from 'react-cookie';

export const Write = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [input, setInput] = useState({
    title: "",
    author: "",
    date: "",
    data: "",
    comments: []
  });
  const date = new Date();

  const onchange = (e) => {
    const {value, name} = e.target;
    setInput({...input, [name]: value});
  }


  const clickHandler = () => {
    setInput({...input, author: cookies.name});
    setInput({...input, date: `${date.getFullYear()}-${parseInt(date.getMonth)+1}-${date.getDate()}`});
    regPost(input)
    .then(res => {
      console.log(res);
    })
  }

  return <Wrapper>
    <WritePost>
      <Form>
        <input placeholder="제목을 입력해주세요" name="title" onChange={onchange}/>
        <hr />
        <textarea placeholder="내용을 입력해주세요" name="data" onChange={onchange}/>
      </Form>
      <Register onClick={clickHandler}>글 등록</Register>
    </WritePost>
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
`;

const WritePost = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
  & input {
    height: 50px;
    border: none;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
    border-radius: inherit;
    font-size: 30px;
    font-weight: bolder;
  }
  & textarea {
    height: 600px;
    border: 0;
    resize: none;
    outline: none;
    padding: 10px;
    border-radius: inherit;
    font-size: 20px;
    font-weight: bolder;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid black;
`;

const Register = styled.button`
  align-self: flex-end;
  width: 200px;
  height: 50px;
  border: none;
  transition: 0.2s;
  border-radius: 15px;
  background: #8b8b8b;
  color: #ffffff;
  font-size: 25px;
  font-weight: 600;
  &:hover {
    transition: 0.2s;
    background-color: #515151;
  }
`;