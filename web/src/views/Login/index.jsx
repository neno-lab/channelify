import React from 'react';
import LoginForm from '../../components/LoginForm';
import './style.scss';

const Login = () => {
  console.log(window.location);
  return (
    <div className='login'>
      <LoginForm />
    </div>
  );
};

export default Login;
