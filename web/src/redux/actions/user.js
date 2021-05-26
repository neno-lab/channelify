import { SAVE_TOKEN, SAVE_USER_DATA } from './actionTypes';

export const saveToken = (data) => {
  return {
    type: SAVE_TOKEN,
    data,
  };
};

export const saveUserData = (data) => {
  return {
    type: SAVE_USER_DATA,
    data,
  };
};
