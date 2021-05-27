import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.scss';

const NotFound = (props) => {
  const handleOnClick = () => {
    if (props.isLoggedIn) {
      props.history.push('/tv-channels');
    } else {
      props.history.push('/');
    }
  };

  return (
    <div className='not-found'>
      <h1>404</h1>
      <p>Hmmm, are you lost?</p>
      <button onClick={() => handleOnClick()}>Back To Home</button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(NotFound));
