import React from 'react';
import {Alert, StatusBar} from 'react-native';
import _ from 'lodash';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationService} from './util';
import Store from './util/Store';
import AppContainer from './containers/Router';

export default function App() {
  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <StatusBar translucent />
        <AppContainer
          forwardRef={
            navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef) // navigating-without-navigation-prop. ex: tap from notification
          }
        />
      </PersistGate>
    </Provider>
  );
}
