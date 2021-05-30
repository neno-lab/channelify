import React from 'react';
import tv from '../../api/tv';
import TvChannelCard from '../TvChannelCard';
import { connect } from 'react-redux';
import './style.scss';
import { saveTvChannelsData } from '../../redux/actions/tv';

const TvChannelForm = (props) => {
  // let arr = [0, 1, 2, 3, 4];
  const [isActive, setActive] = React.useState(0);

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

  React.useEffect(() => {
    let activeCards = {};
    props.tvChannelsData?.forEach((item, index) => {
      activeCards = {
        ...activeCards,
        [index]: 0,
      };
    });

    setActive(activeCards);
  }, [props.tvChannelsData]);

  return (
    <div className='tv-channel-form'>
      {props.tvChannelsData?.map((card, index) => {
        return (
          <TvChannelCard
            key={index}
            index={index}
            tvChannelId={Number(card?.tv_channel_id)}
            tvChannelName={card?.tv_channel_name}
            isActive={isActive}
            setActive={setActive}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.user.token,
    userId: state.user.userData.id,
    tvChannelsData: state.tv.tvChannelsData,
  };
};

export default connect(mapStateToProps)(TvChannelForm);
