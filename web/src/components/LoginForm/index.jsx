import React from 'react';
import InputField from '../InputField';
import { useForm } from 'react-hook-form';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
// import {
//   saveToken,
//   saveUserData,
//   saveUsersInfo,
// } from '../../../redux/actions/user';
// import { getAllUsersExceptOne, login } from '../../../helpers';

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const onSubmit = async (data) => {
  //   try {
  //     login(data.email, data.password).then((loginData) => {
  //       if (loginData.success) {
  //         props.dispatch(saveToken(loginData));
  //         props.dispatch(saveUserData(loginData));

  //         getAllUsersExceptOne(loginData).then((allUsersExceptOne) => {
  //           if (allUsersExceptOne.success) {
  //             props.dispatch(saveUsersInfo(allUsersExceptOne));

  //             if (loginData.user.is_admin) {
  //               props.history.push('/admin');
  //             } else {
  //               props.history.push('/user');
  //             }
  //           }
  //         });
  //       }
  //     });
  //   } catch (err) {
  //     throw err.message;
  //   }
  // };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='login-form-title'>Sign In</h1>

      <div className='login-form-inputs'>
        <InputField
          label='Email'
          type='email'
          id='email'
          name='email'
          register={{
            ...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }),
          }}
          watch={watch().email}
          errors={errors.email}
        />

        <InputField
          label='Password'
          type='password'
          id='password'
          name='password'
          register={{
            ...register('password', {
              required: true,
              minLength: 6,
            }),
          }}
          watch={watch().password}
          errors={errors.password}
        />
      </div>

      <h2 className='login-form-title-2'>
        Don't have account yet?{' '}
        <Link to='/register' className='login-form-link-to-login'>
          Start here.
        </Link>
      </h2>

      <button type='submit'>Sign In</button>
    </form>
  );
};

export default LoginForm;
