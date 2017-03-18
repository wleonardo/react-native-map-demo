/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Switch,
  StatusBar,
  Button,
  Navigator
} from 'react-native';

import Home from './app/page/home.android.js';

export default class reactNativeDemo extends Component {
 static defaultProps = {
    title: '首页'
  };

  render() {
    let defaultName = '首页';
    let defaultComponent = Home;
    return (
     <Navigator
      initialRoute={{ title: defaultName, component: defaultComponent }}
      configureScene={(route) => {
        return Navigator.SceneConfigs.PushFromRight;
      }}
      renderScene={(route, navigator) => {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator} />
      }} />
    );
  }
}

AppRegistry.registerComponent('reactNativeDemo', () => reactNativeDemo);
