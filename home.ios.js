/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Switch,
  StatusBar,
  Button,
  Alert,
  TouchableHighlight
} from 'react-native';

import MapPage from './map.ios.js';
import GeoPage from './geo.ios.js';

export default class Home extends Component {

  constructor(props) {
      super(props);
      this.state = {};
  }

  _pressButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'GeoPage',
                component: GeoPage,
            })
        }
    }

   _gotoGeo() {
   	const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'GeoPage',
                component: GeoPage,
            })
        }
   }

   _gotoMap() {
   	const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'MapPage',
                component: MapPage,
            })
        }
   }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
     backgroundColor="blue"
     barStyle="light-content"/>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button
          onPress={this._gotoMap.bind(this)}
          title="地图插件"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        ></Button>
        <Button
          onPress={this._gotoGeo.bind(this)}
          title="定位插件"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const onPressLearnMore = () => {
  Alert.alert('Button has been pressed!');
};
