import React, { useState, useRef } from 'react';
import { signUp } from '../apis/auth/signUp';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';

export const Register = () => {
  const [cookies, setCookie] = useCookies();
  const [check, setCheck] = useState("");
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
  });
  const _email = useRef();
  const _password = useRef();
  const _passwordChk = useRef();

  const handleChange = (e) => {
    const {value, name} = e.target;
    if(name === "passwordCheck") { setCheck(value); }
    else { setAccount({...account, [name]: value}); }
  }

  const handleClick = () => {
    if(account.password !== check) {alert("Check your password");}
    else {
      signUp(account).then(res => {
        if(res) { window.location.href = "/login"; }
        else{ _passwordChk.current.focus(); }
      });
    }
  }

  return <Wrapper>
    <Container>
      <LogoBox>TextBoard</LogoBox>
      <RegisterBox>
        <Auth>
          <h1>회원가입</h1>
          <input name="name" placeholder="이름" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") _email.current.focus()}}/>
          <input type="email" name="email" placeholder="이메일" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") _password.current.focus();}} ref={_email} />
          <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") _passwordChk.current.focus();}} ref={_password} />
          <input type="password" name="passwordCheck" placeholder="비밀번호 확인" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") handleClick()}} ref={_passwordChk} />
          <Login>이미 계정이 있으신가요? <a href="/login">로그인</a></Login>
        </Auth>
        <button name="button" onClick={handleClick}>회원가입</button>
      </RegisterBox>
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

const RegisterBox = styled.div`
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

const Login = styled.h1`
  align-self: flex-start;
  font-size: 13px;
  margin-top: -15px;
  color: gray;
`;