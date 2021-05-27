import React from 'react';
import { withRouter } from 'react-router-dom';
import { closePopup, openPopup, openToast } from '../../redux/actions/ui';
import { connect } from 'react-redux';
import './style.scss';

const Link = (props) => {
  const handleOnClick = (index) => {
    switch (index) {
      case 0:
        props.popupRef.current.classList.add('fadeOut');
        setTimeout(() => {
          props.dispatch(closePopup());
          props.history.push('/tv-channels');
        }, 250);

        break;
      case 1:
        props.popupRef.current.classList.add('fadeOut');
        setTimeout(() => {
          props.dispatch(closePopup());
          props.history.push('/statistics');
        }, 250);

        break;

      case 2:
        if (props.watchingChannel !== null) {
          props.dispatch(openToast('Cannot change!', 'fail'));
        } else {
          props.popupRef.current.classList.add('fadeOut');
          setTimeout(() => {
            props.dispatch(closePopup());
            props.dispatch(
              openPopup('popup', {
                title: 'Add Location',
                label: 'Location',
              })
            );
          }, 250);
        }

        break;
      case 3:
        props.popupRef.current.classList.add('fadeOut');
        setTimeout(() => {
          props.dispatch(closePopup());
          props.history.push('/');
        }, 250);

        break;
      default:
        break;
    }
  };

  return (
    <h2 className='link' onClick={() => handleOnClick(props.index)}>
      {props.title}
    </h2>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    watchingChannel: state.user.userData.watchingChannel,
  };
};

export default connect(mapStateToProps)(withRouter(Link));
