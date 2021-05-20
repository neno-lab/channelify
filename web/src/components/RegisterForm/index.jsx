import React from 'react';
import InputField from '../InputField';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './style.scss';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { registration, getAllUsersExceptOne } from '../../../helpers';
// import {
//   saveToken,
//   saveUserData,
//   saveUsersInfo,
// } from '../../../redux/actions/user';

const RegisterForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const onSubmit = async (data) => {
  //   try {
  //     registration(
  //       data.first_name,
  //       data.last_name,
  //       data.email,
  //       data.password,
  //       false
  //     ).then((registerData) => {
  //       if (registerData.success) {
  //         props.dispatch(saveToken(registerData));
  //         props.dispatch(saveUserData(registerData));

  //         getAllUsersExceptOne(registerData).then((allUsersExceptOne) => {
  //           if (allUsersExceptOne.success) {
  //             props.dispatch(saveUsersInfo(allUsersExceptOne));

  //             if (!registerData.user.is_admin) {
  //               props.history.push('/');
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
    <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='register-form-title'>Sign Up</h1>

      <div className='register-form-inputs'>
        <InputField
          label='Firstname'
          type='text'
          id='first_name'
          name='first_name'
          register={{
            ...register('first_name', {
              required: true,
              minLength: 2,
            }),
          }}
          watch={watch().first_name}
          errors={errors.first_name}
        />
        <InputField
          label='Lastname'
          type='text'
          id='last_name'
          name='last_name'
          register={{
            ...register('last_name', {
              required: true,
              minLength: 2,
            }),
          }}
          watch={watch().last_name}
          errors={errors.last_name}
        />
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

      <h2 className='register-form-title-2'>
        Already have account?{' '}
        <Link to='/' className='register-form-link-to-login'>
          Start here.
        </Link>
      </h2>

      <button type='submit'>Register</button>
    </form>
  );
};

export default RegisterForm;
