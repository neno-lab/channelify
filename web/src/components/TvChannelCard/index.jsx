import React from 'react';
import './style.scss';

const TvChannelCard = (props) => {
  const handleOnClick = (index) => {
    if (props.isActive[index] === 0) {
      Object.keys(props.isActive).forEach((i) => {
        props.isActive[i] = 2;
      });

      props.setActive({ ...props.isActive, [index]: 1 });
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
      <h2>Tv Channel Name</h2>
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

export default TvChannelCard;
