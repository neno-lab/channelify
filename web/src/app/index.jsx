import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import Login from '../views/Login';
import Registration from '../views/Registration';
import Statistics from '../views/Statistics';
import TvChannels from '../views/TvChannels';
import Header from '../components/Header';
import { connect } from 'react-redux';
import './style.scss';
import HeaderPopup from '../components/HeaderPopup';
import Popup from '../components/Popup';
import Loader from '../Loader';

const App = (props) => {
  return (
    <>
      <Router>
        {props.popupId === 'header-popup' && props.isPopupOpen && (
          <HeaderPopup />
        )}
        {props.popupId === 'popup' && props.isPopupOpen && <Popup />}
        {/* <Loader /> */}
        <Switch>
          {/* <Route
      exact
      path='/'
      render={() => {
        return !props.isLoggedIn ? (
          <Redirect to='/login' />
        ) : props.isAdmin && props.isAuth && props.isLoggedIn ? (
          <Redirect to='/admin' />
        ) : !props.isAdmin && props.isAuth && props.isLoggedIn ? (
          <Redirect to='/user' />
        ) : null;
      }}
    />

    <Route
      exact
      path='/register'
      render={() => {
        return !props.isLoggedIn ? (
          <Redirect to='/register' />
        ) : props.isAdmin && props.isAuth && props.isLoggedIn ? (
          <Redirect to='/admin' />
        ) : !props.isAdmin && props.isAuth && props.isLoggedIn ? (
          <Redirect to='/user' />
        ) : null;
      }}
    /> */}

          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Registration} />

          <Route
            exact
            path='/statistics'
            render={() => (
              <>
                <Header />
                <Statistics />
              </>
            )}
          />
          <Route
            exact
            path='/tv-channels'
            render={() => (
              <>
                <Header />
                <TvChannels />
              </>
            )}
          />
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isPopupOpen: state.ui.popup.isOpen,
    popupId: state.ui.popup.id,
  };
};

export default connect(mapStateToProps)(App);
