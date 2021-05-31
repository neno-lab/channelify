import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { persistStore } from 'redux-persist';

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
