import { signUp } from '../apis/auth/signUp';
import React, { useState } from 'react';

export const Register = () => {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {value, name} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleClick = () => {
    signUp(account)
      .then(res => {
        console.log(res);
      })
  }
  return <div>
      <input name="name" placeholder="id" onChange={handleChange}/>
      <input name="password" placeholder="password" onChange={handleChange}/>
      <input name="email" placeholder="email" onChange={handleChange}/>
      <input type="button" name="button" onClick={handleClick} />
  </div>
};