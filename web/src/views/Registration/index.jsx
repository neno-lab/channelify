import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.scss';

const Registration = (props) => {
  React.useEffect(() => {
    if (props.isLoggedIn) {
      props.history.push('/tv-channels');
    }
  }, [props.history, props.isLoggedIn]);

  return (
    <div className='registration'>
      <RegisterForm />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Registration));
