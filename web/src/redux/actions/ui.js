import {
  CLOSE_POPUP,
  OPEN_POPUP,
  SET_LOADER,
  UNSET_LOADER,
} from './actionTypes';

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

export const setLoader = () => {
  return {
    type: SET_LOADER,
  };
};

export const unsetLoader = () => {
  return {
    type: UNSET_LOADER,
  };
};
