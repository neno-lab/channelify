import React from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.scss';
import PieChart from '../../components/PieChart';
import user from '../../api/user';

const Statistics = (props) => {
  console.log(props.userLocation);
  React.useEffect(() => {
    if (!props.isLoggedIn) {
      props.history.push('/');
    }
  }, [props.history, props.isLoggedIn]);

  const fetchData = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    };

    user
      .get(`/broadcast/${props.userId}/${props.userLocation}`, config)
      .then((res) => {
        return res;
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log('Server Error: ', err);
      });

    //   const res = await user.get(
    //     `/broadcast/${props.userId}`,
    //     config,
    //     params
    //   );

    //   console.log('onClickFetchDataRes: ', res);
    // } catch (err) {
    //   console.error('Server Error: ', err);
    // }
  };

  return (
    <>
      <Header />
      <div className='statistics'>
        <PieChart />
        <button onClick={() => fetchData()}>Fetch Data</button>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userLocation: state.user.userData.location,
    token: state.user.token,
    userId: state.user.userData.id,
  };
};

export default connect(mapStateToProps)(withRouter(Statistics));
