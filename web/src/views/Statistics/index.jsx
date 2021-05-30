import React from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.scss';
import PieChart from '../../components/PieChart';

const Statistics = (props) => {
  React.useEffect(() => {
    if (!props.isLoggedIn) {
      props.history.push('/');
    }
  }, [props.history, props.isLoggedIn]);

  return (
    <>
      <Header />
      <div className='statistics'>
        <PieChart />
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Statistics));
