import { CLOSE_POPUP, OPEN_POPUP } from './actionTypes';

export const openPopup = (id, data) => {
  return {
    type: OPEN_POPUP,
    id,
    data,
  };
};

export const closePopup = () => {
  return {
    type: CLOSE_POPUP,
  };
};
