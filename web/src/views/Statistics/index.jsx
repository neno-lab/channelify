import React from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.scss';
import PieChart from '../../components/PieChart';
import { saveTvChannelsData } from '../../redux/actions/tv';
import tv from '../../api/tv';

const Statistics = (props) => {
  React.useEffect(() => {
    if (!props.isLoggedIn) {
      props.history.push('/');
    }
  }, [props.history, props.isLoggedIn]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        };

        const { data } = await tv.get('/', config);

        if (data.success) {
          props.dispatch(saveTvChannelsData(data));
        }
      } catch (err) {
        console.error('Server Error: ', err);
      }
    };
    fetchData();
  }, []);

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
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(withRouter(Statistics));
