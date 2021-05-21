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
      <LinkForm />
      <span></span>
      <div className='header-popup-info'>
        <h4>Username</h4>
        <h4>Current Location ~ Terziceva 9</h4>
      </div>
    </div>
  );
};

export default connect()(HeaderPopup);