import { SAVE_TOKEN, SAVE_USER_DATA } from '../actions/actionTypes';

const initialStateUser = {
  isAuth: false,
  isLoggedIn: false,
  token: null,
  userData: {
    id: null,
    firstName: null,
    lastName: null,
    location: null,
    email: null,
    watchingChannel: null,
    isAdmin: null,
  },
  usersInfo: null,
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
          watchingChannel: Number(user_data.tv_channel_id_fk),
        },
      };

    default:
      return state;
  }
};

export { user };
