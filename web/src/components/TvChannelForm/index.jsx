import React from 'react';
import TvChannelCard from '../TvChannelCard';
import './style.scss';

const TvChannelForm = () => {
  let arr = [0, 1, 2, 3, 4];
  const [isActive, setActive] = React.useState(0);

  React.useEffect(() => {
    let activeCards = {};
    arr.forEach((item, index) => {
      activeCards = {
        ...activeCards,
        [index]: 0,
      };
    });

    setActive(activeCards);
  }, []);

  return (
    <div className='tv-channel-form'>
      {arr.map((card, index) => {
        return (
          <TvChannelCard
            key={index}
            index={index}
            isActive={isActive}
            setActive={setActive}
          />
        );
      })}
    </div>
  );
};

export default TvChannelForm;
