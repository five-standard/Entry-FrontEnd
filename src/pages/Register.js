import React, { useState } from 'react';
import { signUp } from '../apis/auth/signUp';

export const Register = () => {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const {value, name} = e.target;
    setAccount({...account, [name]: value});
  }

  const onClick = () => {
    signUp(account)
      .then(res => {
        console.log(res);
      })
  }
  return <div>
      <input name="name" placeholder="id" onChange={onChange}/>
      <input name="password" placeholder="password" onChange={onChange}/>
      <input name="email" placeholder="email" onChange={onChange}/>
      <input type="button" name="button" onClick={onClick} />
  </div>
};