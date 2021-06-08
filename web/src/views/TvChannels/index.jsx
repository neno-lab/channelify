import React from 'react';
import Toast from '../../components/Toast';
import TvChannelForm from '../../components/TvChannelForm';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';
import './style.scss';
import user from '../../api/user';

const TvChannels = (props) => {
  React.useEffect(() => {
    if (!props.isLoggedIn) {
      props.history.push('/');
    }
  }, [props.history, props.isLoggedIn]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        };

        const response = await user.get('/count', config);
        console.log('APP RES: ', response);
      } catch (err) {
        console.log('Error: ', err);
      }
    };
    fetchData();
  }, []);

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
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(withRouter(TvChannels));
