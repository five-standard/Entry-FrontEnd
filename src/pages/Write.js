import React from 'react';
import { styled } from 'styled-components';

export const Write = () => {
  return <Wrapper>
    <WritePost>
      <h1>글 작성</h1>
      <input placeholder="제목을 입력해주세요"/>
      <hr />
      <textarea placeholder="내용을 입력해주세요"/>
      <input type="button" value="글 등록"/>
    </WritePost>
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const WritePost = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 10px;
  & > input {
    height: 40px;
    border: none;
    outline: none;
    font-size: 30px;
    font-weight: bolder;
  }
  & > textarea {
    height: 500px;
    border: 0;
    resize: none;
    outline: none;
    font-size: 20px;
    font-weight: bolder;
  }
`;