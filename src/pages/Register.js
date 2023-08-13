import { useMediaQuery } from 'react-responsive';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { signUp } from '../apis/auth/signUp';

export const Register = () => {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [check, setCheck] = useState("");
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile
  const navigate = useNavigate();
  const _passwordChk = useRef();
  const _password = useRef();
  const _email = useRef();

  const handleChange = (e) => {
    const {value, name} = e.target;
    if(name === "passwordCheck") { setCheck(value); }
    else { setAccount({...account, [name]: value}); }
  }

  const handleClick = () => {
    if(account.password === check) {
      signUp(account).then(res => {
        if(res) {
          alert("계정이 생성되었습니다");
          navigate("/login");
        } else { _passwordChk.current.focus(); }
      });
    } else alert("Check your password");
  }

  const handleKeydown = (e) => {
    if(e.key==="Enter") {
      if(e.target.name==="name") _email.current.focus();
      else if(e.target.name==="email") _password.current.focus();
      else if(e.target.name==="password") _passwordChk.current.focus();
      else if(e.target.name==="passwordCheck") handleClick();
    }
  }

  return <Wrapper>
    <Container pc={isPc}>
      {
        isPc
        ? <Logo />
        : undefined 
      }
      <RegisterBox>
        <Auth>
          <h1>회원가입</h1>
          <input name="name" placeholder="이름" onChange={handleChange} onKeyDown={handleKeydown}/>
          <input name="email" placeholder="이메일" onChange={handleChange} onKeyDown={handleKeydown} ref={_email} />
          <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} onKeyDown={handleKeydown} ref={_password} />
          <input type="password" name="passwordCheck" placeholder="비밀번호 확인" onChange={handleChange} onKeyDown={handleKeydown} ref={_passwordChk} />
          <Login>이미 계정이 있으신가요? <a href="/login">로그인</a></Login>
        </Auth>
        <Button Click={handleClick} Text="회원가입" Width={isPc?250:200} Height={50} />
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
  width: ${props => props.pc?"800px":"350px"};
  height: ${props => props.pc?"650px":"550px"};
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