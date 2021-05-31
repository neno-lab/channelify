import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from '../views/Login';
import Registration from '../views/Registration';
import Statistics from '../views/Statistics';
import TvChannels from '../views/TvChannels';
import { connect } from 'react-redux';
import './style.scss';
import HeaderPopup from '../components/HeaderPopup';
import Popup from '../components/Popup';
import Loader from '../components/Loader';
import NotFound from '../views/404';
import { loggingIn, loggingOut } from '../redux/actions/user';

const App = (props) => {
  React.useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission((result) => {
        if (result !== 'granted') {
          console.log('User Denied Notifications!');
        } else {
          console.log('User Granted Notifications! :)');
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if (props.token) {
      props.dispatch(loggingIn());
    } else {
      props.dispatch(loggingOut());
    }
  }, [props.token]);

  React.useEffect(() => {
    if (props.isPopupOpen) {
      document.body.classList.add('body-scroll-lock');
    } else {
      document.body.classList.remove('body-scroll-lock');
    }
  }, [props.isPopupOpen]);

  if (window.DeviceOrientationEvent) {
    console.log('DeviceOrientation is supported!');

    window.addEventListener(
      'deviceorientation',
      (e) => {
        console.log('Saibaba: ', e.alpha);
      },
      true
    );
  } else {
    console.log('DeviceOrientation is not supported!');
  }

  return (
    <>
      {props.isLoading && <Loader />}
      <Router>
        {props.popupId === 'header-popup' && props.isPopupOpen && (
          <HeaderPopup />
        )}
        {props.popupId === 'popup' && props.isPopupOpen && <Popup />}

        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Registration} />
          <Route
            exact
            path='/tv-channels'
            render={() => {
              if (props.isLoggedIn) {
                return <TvChannels />;
              } else {
                return <Redirect to='/' />;
              }
            }}
          />
          <Route
            exact
            path='/statistics'
            render={() => {
              if (props.isLoggedIn) {
                return <Statistics />;
              } else {
                return <Redirect to='/' />;
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isPopupOpen: state.ui.popup.isOpen,
    popupId: state.ui.popup.id,
    isLoading: state.ui.isLoading,
    token: state.user.token,
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
