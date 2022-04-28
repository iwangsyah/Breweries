import React from 'react';
import {SafeAreaView} from 'react-native';
import ProgressWebView from 'react-native-progress-webview';
import {Navbar} from '../components';

const WebScreen = ({route, navigation}) => {
  const {title, url} = route.params;

  const onNavigationStateChange = webViewState => {
    // webViewState.canGoBack && navigation.pop();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar title={title + 'kjaksjdka jkasdjk '} onBack={() => navigation.pop()}/>
      <ProgressWebView
        source={{uri: url}}
        onNavigationStateChange={onNavigationStateChange}
      />
    </SafeAreaView>
  );
};

export default WebScreen;
