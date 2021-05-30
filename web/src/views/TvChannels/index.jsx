import React from 'react';
import Toast from '../../components/Toast';
import TvChannelForm from '../../components/TvChannelForm';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';
import './style.scss';

const TvChannels = (props) => {
  React.useEffect(() => {
    if (!props.isLoggedIn) {
      props.history.push('/');
    }
  }, [props.history, props.isLoggedIn]);

  return (
    <>
      <Header />
      <div className='tv-channels'>
        {props.isToast && <Toast />}
        <TvChannelForm />
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isToast: state.ui.isToast,
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(TvChannels));
