import React, { useState, useEffect} from 'react';
import { regPost } from '../apis/post/regPost';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';

export const Write = () => {
  const date = new Date();
  const [cookies, setCookies] = useCookies();
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
      <Register onClick={handleClick}>글 등록</Register>
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
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid black;
  & > input {
    height: 50px;
    border: none;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
    border-radius: inherit;
    font-size: 30px;
    font-weight: bolder;
  }
  & > textarea {
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
`