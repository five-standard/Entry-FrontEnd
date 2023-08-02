import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';
import { signUp } from '../apis/auth/signUp';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';

export const Register = () => {
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
    if(account.password !== check) { alert("Check your password"); }
    else {
      signUp(account).then(res => {
        res? 
        window.location.href = "/login":
        _passwordChk.current.focus()
      });
    }
  }

  return <Wrapper>
    <Container>
      <Logo />
      <RegisterBox>
        <Auth>
          <h1>회원가입</h1>
          <input name="name" placeholder="이름" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") _email.current.focus()}}/>
          <input name="email" placeholder="이메일" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") _password.current.focus();}} ref={_email} />
          <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") _passwordChk.current.focus();}} ref={_password} />
          <input type="password" name="passwordCheck" placeholder="비밀번호 확인" onChange={handleChange} onKeyDown={(e) => {if(e.key==="Enter") handleClick()}} ref={_passwordChk} />
          <Login>이미 계정이 있으신가요? <a href="/login">로그인</a></Login>
        </Auth>
        <Button Click={handleClick} Text="회원가입" Width={250} Height={50} />
      </RegisterBox>
    </Container>
  </Wrapper>
}


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
  border-radius: 15px;
  border: 2px solid black;
`
const RegisterBox = styled.div`
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
`
const Login = styled.h1`
  align-self: flex-start;
  margin-top: -15px;
  color: gray;
  font-size: 13px;
`