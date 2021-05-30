import React from 'react';
import InputField from '../InputField';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
import user from '../../api/user';
import { saveToken, saveUserData } from '../../redux/actions/user';
import { openToast, setLoader, unsetLoader } from '../../redux/actions/ui';

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    user
      .post('/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        return res;
      })
      .then(({ data }) => {
        if (data.success) {
          props.dispatch(saveUserData(data));
          props.dispatch(saveToken(data));
          props.dispatch(setLoader());
          setTimeout(() => {
            props.dispatch(unsetLoader());
            props.history.push('/tv-channels');
            props.dispatch(openToast('Logged In!', 'success'));
          }, 1000);
        }
      })
      .catch((err) => {
        console.error('Server Error: ', err);
      });
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

export default connect()(withRouter(LoginForm));
