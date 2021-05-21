import React from 'react';
import { connect } from 'react-redux';
import { closePopup } from '../../redux/actions/ui';
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
    </div>
  );
};

export default connect()(HeaderPopup);
