import React from 'react';
import Toast from '../../components/Toast';
import TvChannelForm from '../../components/TvChannelForm';
import { connect } from 'react-redux';
import './style.scss';

const TvChannels = (props) => {
  return (
    <div className='tv-channels'>
      {props.isToast && <Toast />}
      <TvChannelForm />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isToast: state.ui.isToast,
  };
};

export default connect(mapStateToProps)(TvChannels);
