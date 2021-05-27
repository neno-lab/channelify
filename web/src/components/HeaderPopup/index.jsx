import React from 'react';
import { connect } from 'react-redux';
import { closePopup } from '../../redux/actions/ui';
import LinkForm from '../LinkForm';
import './style.scss';

const HeaderPopup = (props) => {
  const popupRef = React.createRef();

  return (
    <div className='header-popup' ref={popupRef}>
      <i
        className='fas fa-times'
        onClick={() => {
          popupRef.current.classList.add('fadeOut');
          setTimeout(() => {
            props.dispatch(closePopup());
          }, 250);
        }}
      ></i>
      <LinkForm popupRef={popupRef} />
      <span></span>
      <div className='header-popup-info'>
        <h4>{props.firstName + ' ' + props.lastName}</h4>
        <h4>Your Location ~ {props.location}</h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    firstName: state.user.userData.firstName,
    lastName: state.user.userData.lastName,
    location: state.user.userData.location,
  };
};

export default connect(mapStateToProps)(HeaderPopup);
