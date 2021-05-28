import React from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.scss';

const Statistics = (props) => {
  React.useEffect(() => {
    if (!props.isLoggedIn) {
      props.history.push('/');
    }
  }, []);

  return (
    <>
      <Header />
      <div className='statistics'></div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Statistics));
