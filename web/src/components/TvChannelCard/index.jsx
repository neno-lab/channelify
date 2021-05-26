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

  const handleOnClick = (index, tvChannelId) => {
    let config = {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    };

    if (props.isActive[index] === 0) {
      Object.keys(props.isActive).forEach((i) => {
        props.isActive[i] = 2;
      });

      props.setActive({ ...props.isActive, [index]: 1 });

      tv.put(
        `/${props.userId}`,
        {
          tv_channel: tvChannelId,
        },
        config
      )
        .then((res) => {
          return res;
        })
        .then(({ data }) => {
          if (data.success) {
            return user.get(`/send-notification/${props.userId}`, config);
          }
        })
        .then((res) => {
          return res;
        })
        .then(({ data }) => {
          if (data.success) {
            return;
          }
        })
        .catch((err) => {
          console.error('Server Error: ', err);
        });
    } else if (props.isActive[index] === 1) {
      Object.keys(props.isActive).forEach((i) => {
        props.isActive[i] = 0;
      });

      props.setActive({ ...props.isActive });

      tv.put(
        `/${props.userId}`,
        {
          tv_channel: null,
        },
        config
      )
        .then((res) => {
          return res;
        })
        .then(({ data }) => {
          if (data.success) {
            return;
          }
        })
        .catch((err) => {
          console.error('Server Error: ', err);
        });
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
        onClick={() => handleOnClick(props.index, props.tvChannelId)}
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
