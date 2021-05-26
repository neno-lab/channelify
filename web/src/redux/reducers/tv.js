import { SAVE_TV_CHANNELS_DATA } from '../actions/actionTypes';

const initialStateTv = {
  tvChannelsData: null,
};

const tv = (state = initialStateTv, action) => {
  switch (action.type) {
    case SAVE_TV_CHANNELS_DATA:
      return {
        ...state,
        tvChannelsData: action.data.tv_channels,
      };

    default:
      return state;
  }
};

export { tv };
