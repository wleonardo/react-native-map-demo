/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
// import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Switch,
  StatusBar,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {};
      console.log(this.props);
  }
  _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
   }
   componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // alert('initla');
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 0, distanceFilter: 1}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // alert('get');
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  render() {
    return (
      <View>
        <Text style={{marginTop:100}}>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
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
