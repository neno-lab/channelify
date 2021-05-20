import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import Login from '../views/Login';
import Registration from '../views/Registration';
import Profile from '../views/Profile';
import Statistics from '../views/Statistics';
import TvChannels from '../views/TvChannels';
import './style.scss';

const App = () => {
  return (
    <Router>
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
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/statistics' component={Statistics} />
        <Route exact path='/tv-channels' component={TvChannels} />
      </Switch>
    </Router>
  );
};

export default App;
