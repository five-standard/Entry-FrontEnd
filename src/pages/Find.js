import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';

export const Find = () => {
  return <Wrapper>
     <Container>
      <FindSection>
        <h1>아이디 찾기</h1>
        <div>
          <input type="email" placeholder="이메일을 입력하세요" />
          <div>
            <input type="number" placeholder="인증번호를 입력하세요" />
            <input type="button" value="인증번호 발송"/>
          </div>
        </div>
        <button>아이디 찾기</button>
      </FindSection>
      <MiddleBar />
      <FindSection>
      </FindSection>
    </Container>
  </Wrapper>
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 853px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  height: 650px;
  background: #ffffff;
  border-radius: 15px;
  border: 2px solid black;
`

const MiddleBar = styled.div`
  width: 2px;
  height: 90%; 
  background: #000;
`

const FindSection = styled.div`
  gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100%;
  box-sizing: border-box;
  border-radius: 15px;
  & > div {
    display: flex;
    gap: 10px;
    flex-direction: column;
    & > div { display: flex; gap: 20px; }
  }
  & > button {
    width: 80%;
    height: 50px;
    font-size: 20px;
    font-weight: 600;
    transition: 0.2s;
    background: #8b8b8b;
    border-radius: 15px;
    &:hover {
      transition: 0.2s;
      background-color: #515151;
    }
  }
`