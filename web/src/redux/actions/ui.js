import {
  CLOSE_POPUP,
  CLOSE_TOAST,
  OPEN_POPUP,
  OPEN_TOAST,
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

export const openToast = (text, className) => {
  return {
    type: OPEN_TOAST,
    text,
    className,
  };
};

export const closeToast = () => {
  return {
    type: CLOSE_TOAST,
  };
};
