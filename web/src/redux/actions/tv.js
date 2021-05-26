import { SAVE_TV_CHANNELS_DATA } from './actionTypes';

export const saveTvChannelsData = (data) => {
  return {
    type: SAVE_TV_CHANNELS_DATA,
    data,
  };
};
