import React from 'react';
import InputField from '../InputField';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './style.scss';
import user from '../../api/user';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveToken, saveUserData } from '../../redux/actions/user';
import { urlBase64ToUint8Array } from '../../helpers';

const RegisterForm = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let reg;
    let userId;

    user
      .post('/register', {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        // console.log('Response Register: ', res);
        return res;
      })
      .then(({ data }) => {
        // console.log(data);
        if (data.success) {
          userId = data.user.user_id;
          props.dispatch(saveUserData(data));
          props.dispatch(saveToken(data));

          return navigator.serviceWorker.ready;
        }
      })
      .then((swreg) => {
        reg = swreg;
        return swreg.pushManager.getSubscription();
      })
      .then((sub) => {
        if (sub === null) {
          const publicKey =
            'BPSZ2moX1QMc_OInpcyCvu-hL7vvAHtLpRvqHQ5_vICwQ4EYw7i-2z72dOdb17Q7-ju1MYfGrazS7XFHj9ataBs';
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey),
          });
        }
      })
      .then((newSub) => {
        if (newSub !== undefined) {
          return user.put(`/save-subscription/${userId}`, {
            newSub,
          });
        }
      })
      .then(({ data }) => {
        if (data.success) {
          props.history.push('/tv-channels');
        }
      })
      .catch((err) => console.error(err));
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

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

export default connect()(withRouter(RegisterForm));
