import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, Text } from 'react-native';

import Home from './home.ios.js';

export default class NavigatorIOSApp extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: 'My Initial Scene',
        }}
        style={{flex: 1}}
      ></NavigatorIOS>
    );
  }
}