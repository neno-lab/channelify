import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedReducer = rootReducer;

const composeEnhancers =
  typeof window === 'object' && window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export default (preloadedState = {}) => {
  let store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
  let persistor = persistStore(store);

  return { store, persistor };
};
