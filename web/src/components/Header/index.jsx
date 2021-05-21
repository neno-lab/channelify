import React from 'react';
import { Logo } from '../../assets/icons';
import { connect } from 'react-redux';
import './style.scss';
import { openPopup } from '../../redux/actions/ui';

const Header = (props) => {
  return (
    <header>
      <div className='header-container'>
        <Logo className='logo' />
        <i
          className='fas fa-bars'
          onClick={() => props.dispatch(openPopup())}
        ></i>
      </div>
    </header>
  );
};

export default connect()(Header);
