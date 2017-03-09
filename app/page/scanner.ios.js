/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
// import MapView from 'react-native-maps';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Camera from 'react-native-camera';

import RecordPage from './record.ios.js';

var loading = false;

export default class BadInstagramCloneApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _pressButton() {
    const { navigator } = this.props;
    if (navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
      navigator.pop();
    }
  }
  componentDidMount() {
    loading = false;
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  getBarCode(data) {
    if (!loading && data) {
      loading = true;
      const { navigator } = this.props;
        navigator.resetTo({
          name: 'recordPage',
          component: RecordPage
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
         <Camera
          ref={(cam) => {
            console.log(cam);
            this.camera = cam;
          }}
         style={styles.preview}
         onBarCodeRead={this.getBarCode.bind(this)}
          aspect={Camera.constants.Aspect.stretch}>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('BadInstagramCloneApp', () => BadInstagramCloneApp);
