import { useMediaQuery } from 'react-responsive';
import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { signIn } from '../apis/auth/signIn';

export const Login = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [,setCookie] = useCookies();
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile
  const _password = useRef();

  const handleChange = (e) => {
    const {value, name} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleClick = () => {
    signIn(account).then(res => {
      if(res) {
        setCookie('accessToken', res.data.accessToken, { path: '/' });
        setCookie('name', res.data.user.name, { path: '/' });
        window.location.href = "/";
      } else { _password.current.focus(); }
    });
  }

  const handleKeyDown = (e) => {
    if(e.key==="Enter") {
      if(e.target.name==="email") _password.current.focus();
      else if(e.target.name==="password") handleClick();
    }
  }

  return <Wrapper>
    <Container pc={isPc}>
      {
        isPc
        ? <Logo />
        : undefined 
      }
      <LoginBox>
        <Auth>
          <h1>로그인</h1>
          <input type="email" name="email" placeholder="이메일" onChange={handleChange} onKeyDown={handleKeyDown}/>
          <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} onKeyDown={handleKeyDown} ref={_password} />
          <BottomText>아직 계정이 없으신가요? <a href="/register">회원가입</a></BottomText>
          <BottomText>계정을 잃어버리셨나요? <a href="/find">계정 찾기</a></BottomText>
        </Auth>
        <Button Click={handleClick} Text="로그인" Width={isPc?250:200} Height={50} />
      </LoginBox>
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

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
`

const Auth = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > input {
    width: 250px;
    border-bottom: 1px solid black;
  }
  & h1:nth-child(2) { font-size: 10px; }
`

const BottomText = styled.h1`
  align-self: flex-start;
  font-size: 13px;
  margin-top: -20px;
  color: gray;
`