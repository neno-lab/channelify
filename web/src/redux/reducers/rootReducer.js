import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
// import { tv } from './tv';
import { user } from './user';
import { ui } from './ui';
import storage from 'redux-persist/lib/storage';

const persistConfigUi = {
  key: 'ui',
  storage,
  blacklist: ['popup', 'isLoading'],
};

const persistConfigUser = {
  key: 'user',
  storage,
};

const persistConfigTv = {
  key: 'tv',
  storage,
};

const rootReducer = combineReducers({
  ui: persistReducer(persistConfigUi, ui),
  user: persistReducer(persistConfigUser, user),
  //   tv: persistReducer(persistConfigTv, tv),
});

export default rootReducer;
