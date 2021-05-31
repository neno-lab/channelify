import React from 'react';
import LoginForm from '../../components/LoginForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.scss';

const Login = (props) => {
  React.useEffect(() => {
    if (props.isLoggedIn) {
      props.history.push('/tv-channels');
    }
  }, [props.history]);

  return (
    <div className='login'>
      <LoginForm />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Login));
