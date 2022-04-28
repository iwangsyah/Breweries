import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage,
  whitelist: ['bookmark'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store);

const pausePersistor = () => {
  if (persistor) {
    persistor.pause();
  }
};

const clearPersistor = () => {
  if (persistor) {
    persistor.purge();
  }
};

export default {
  store,
  persistor,
  pausePersistor,
  clearPersistor,
};
