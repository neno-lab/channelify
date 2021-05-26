import React from 'react';
import { Logo } from '../../assets/icons';
import { connect } from 'react-redux';
import './style.scss';
import { openPopup } from '../../redux/actions/ui';
import { withRouter } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <div className='header-container'>
        <Logo
          className='logo'
          onClick={() => {
            props.history.push('/tv-channels');
          }}
        />
        <i
          className='fas fa-bars'
          onClick={() => props.dispatch(openPopup('header-popup'))}
        ></i>
      </div>
    </header>
  );
};

export default connect()(withRouter(Header));
