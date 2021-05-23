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
import { urlBase64ToUint8Array } from '../helpers';
// import Loader from '../components/Loader';

const App = (props) => {
  if ('serviceWorker' in navigator) {
    let reg;

    navigator.serviceWorker.ready
      .then((swreg) => {
        reg = swreg;
        return swreg.pushManager.getSubscription();
      })
      .then((sub) => {
        if (sub === null) {
          const publicKey =
            'BPSZ2moX1QMc_OInpcyCvu-hL7vvAHtLpRvqHQ5_vICwQ4EYw7i-2z72dOdb17Q7-ju1MYfGrazS7XFHj9ataBs';
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey),
          });
        } else {
          console.log('Subscription already exists.');
        }
      })
      .then((newSub) => {
        console.log('New Sub: ', newSub);
        return fetch('http://localhost:5000/api/v1/users/subscribe', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newSub),
        });
      })
      .then((res) => {
        if (res.ok) {
          console.log('All Good.');
        }
      });
  }

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
