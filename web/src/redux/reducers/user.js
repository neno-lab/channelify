import {
  LOGGING_IN,
  LOGGING_OUT,
  SAVE_TOKEN,
  SAVE_USER_DATA,
} from '../actions/actionTypes';

const initialStateUser = {
  isLoggedIn: false,
  token: null,
  userData: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    endpoint: null,
    auth: null,
    p256dh: null,
    watchingChannel: null,
  },
};

const user = (state = initialStateUser, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.data.token,
      };

    case SAVE_USER_DATA:
      let user_data = action.data.user;
      console.log('user_data: ', user_data);
      return {
        ...state,
        userData: {
          id: Number(user_data.user_id),
          firstName: user_data.first_name,
          lastName: user_data.last_name,
          email: user_data.email,
          location: user_data.location,
          endpoint: user_data.endpoint,
          auth: user_data.auth,
          p256dh: user_data.p256dh,
          watchingChannel: user_data.tv_channel_id_fk,
        },
      };

    case LOGGING_IN:
      return {
        ...state,
        isLoggedIn: true,
      };

    case LOGGING_OUT:
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        userData: {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          location: null,
          endpoint: null,
          auth: null,
          p256dh: null,
          watchingChannel: null,
        },
      };

    default:
      return state;
  }
};

export { user };
