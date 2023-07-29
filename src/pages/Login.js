import React, { useState, useRef } from 'react';
import { signIn } from '../apis/auth/signIn';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';

export const Login = () => {
  const [cookies, setCookie] = useCookies()
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const _password = useRef();

  const handleChange = (e) => {
    const {value, name} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleClick = () => {
    signIn(account).then(res => {
      if(res) {
        setCookie('accessToken', res.data.accessToken, { path: '/' })
        setCookie('name', res.data.user.name, { path: '/' })
        window.location.href = "/";
      }else{ _password.current.focus(); }
    });
  }

  return <Wrapper>
    <Container>
      <LogoBox>TextBoard</LogoBox>
      <LoginBox>
        <Auth>
          <h1>로그인</h1>
          <input name="email" placeholder="이메일" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") _password.current.focus()}}/>
          <input name="password" placeholder="비밀번호" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") handleClick()}} ref={_password} />
          <Register>아직 계정이 없으신가요? <a href="/register">회원가입</a></Register>
        </Auth>
        <button name="button" onClick={handleClick}>로그인</button>
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
  width: 800px;
  height: 650px;
  background: #ffffff;
  border-radius: 15px;
  border: 2px solid black;
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  border-radius: 15px;
  background: #EFEAEA;
  box-shadow: 4px 0px 6px gray;
  font-size: 40px;
`

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
  & > button {
    width: 250px;
    height: 50px;
    border: 0px;
    background: #8B8B8B;
    border-radius: 15px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    transition: 0.2s;
    &:hover {
      transition: 0.2s;
      background-color: #515151;
    }
  }
`

const Auth = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > input {
    width: 250px;
    border: 0;
    outline: none;
    border-bottom: 1px solid black;
    font-weight: bolder;
  }
  & h1:nth-child(2) { font-size: 10px; }
`

const Register = styled.h1`
  align-self: flex-start;
  font-size: 13px;
  margin-top: -15px;
  color: gray;
`;