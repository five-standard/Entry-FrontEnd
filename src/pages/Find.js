import { useMediaQuery } from 'react-responsive';
import { styled } from 'styled-components';
import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';

export const Find = () => {
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile
  const [check, setCheck] = useState(false);

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  }

  return <Wrapper>
    <Container pc={isPc}>
      {
        isPc
        ? <Logo />
        : undefined 
      }
      <div>
        <FindSection pc={isPc}>
          <Top>
            <h1>{!check?"아이디 찾기":"비밀번호 찾기"}</h1>
            <div>
              <input type="email" placeholder="이메일을 입력하세요" />
              <input name="pwHide" type="text" placeholder="아이디를 입력하세요" style={{display: check?"block":"none"}}/>
              <div>
                <input type="text" placeholder="인증번호를 입력하세요" />
                <input type="button" value="인증번호 전송" />
              </div>
              <label>
              <div>비밀번호 찾기 <input type="checkbox" onChange={handleCheck} checked={check}/></div>
              </label>
            </div>
          </Top>
          <Button Text={!check?"아이디 찾기":"비밀번호 찾기"} Width={250} Height={40} Style={{fontSize: "20px"}} />
        </FindSection>
      </div>
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
  width: ${props => props.pc?"800px":"350px"};
  height: ${props => props.pc?"650px":"550px"};
  border-radius: 15px;
  border: 2px solid black;
`

const FindSection = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: ${props => props.pc?"400px":"350px"};
  height: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  border-radius: 15px;
  box-sizing: border-box;
  & input { 
    border-bottom: 1px solid black; 
  }
  & input[type="button"] {
    cursor: pointer;
    transition: 0.2s;
    border-radius: 5px;
    border: 1px solid black;
    color: black;
    &:hover {
      background: whitesmoke;
    }
  }
  & input[name="pwHide"] {
    display: "none";
  }
`

const Top = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  & > div { //입력 항목
    gap: 20px;
    display: flex;
    flex-direction: column;
    width: 80%;
    & > div { //인증번호 항목
      gap: 10px;
      display: flex;
      & > input:nth-child(1) {
        width: 70%;
      }
    }
  }
`