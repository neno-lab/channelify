import React from 'react';
import user from '../../api/user';
import { connect } from 'react-redux';
import './style.scss';
import tv from '../../api/tv';

const TvChannelCard = (props) => {
  // const displayConfirmNotification = () => {
  //   if ('serviceWorker' in navigator) {
  //     let options = {
  //       body: 'You successfully subscribed to our Notification service!',
  //     };

  //     navigator.serviceWorker.ready.then((swreg) => {
  //       swreg.showNotification('Succefully subscribed!', options);
  //     });
  //   }
  // };

  const handleOnClick = (index) => {
    if (props.isActive[index] === 0) {
      Object.keys(props.isActive).forEach((i) => {
        props.isActive[i] = 2;
      });

      props.setActive({ ...props.isActive, [index]: 1 });

      //   let params={
      //     tv_channel:
      //   }

      //   let config = {
      //     headers: {
      //       Authorization: `Bearer ${props.token}`,
      //     },
      //   };

      //  tv.put(`/${props.userId}`, )

      // user
      //   .get(`/send-notification/${props.userId}`, config)
      //   .then((res) => {
      //     console.log(res);
      //     return res;
      //   })
      //   .then((data) => {
      //     console.log('Get Data: ', data);
      //   })
      //   .catch((err) => {
      //     console.error('Server Error: ', err);
      //   });
    } else if (props.isActive[index] === 1) {
      Object.keys(props.isActive).forEach((i) => {
        props.isActive[i] = 0;
      });

      props.setActive({ ...props.isActive });
    }
  };

  return (
    <div
      className={`tv-channel-card ${
        props.isActive[props.index] === 1
          ? 'active'
          : props.isActive[props.index] === 2
          ? 'not-active'
          : ''
      }`}
    >
      <h2>{props.tvChannelName}</h2>
      <p>
        Currently playing: <span>Titanic</span>
      </p>
      <span style={{ fontWeight: 300 }}>
        <i>Abstract:</i>
      </span>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        voluptatum iure cupiditate nam? Molestias, culpa vel assumenda
        consectetur alias, expedita id quod ipsum deleniti, laudantium eius.
      </p>
      <button
        className={`${props.isActive[props.index] === 1 ? 'active' : ''}`}
        onClick={() => handleOnClick(props.index)}
      >
        {props.isActive[props.index] === 1 ? 'Stop Watching' : 'Watch'}
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.userData.id,
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(TvChannelCard);
