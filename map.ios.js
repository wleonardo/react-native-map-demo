/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';

import MapView from 'react-native-maps';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Switch,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
      super(props);
      this.state = { latitude: -26, longitude: 28 , markerList: []};
      console.log(this.props);
      console.log(MapView);
  }

  getGeo() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({lastPosition});
        this.setState({longitude: position.coords.longitude});
        this.setState({latitude: position.coords.latitude});
        this.addMaker()
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, maximumAge: 0, distanceFilter: 1}
    );
  }

  componentDidMount() {
    this.getGeo();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log(position);
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
      this.setState({longitude: position.coords.longitude});
      this.setState({latitude: position.coords.latitude});
      this.addMaker()
    },()=>{

    },{enableHighAccuracy: true, maximumAge: 0, distanceFilter: 1});
  }

  _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
   }
   addMaker() {
    console.log(parseFloat(this.state.longitude))
    console.log(parseFloat(this.state.latitude))
    var mapList = JSON.parse(JSON.stringify(this.state.markerList));

    mapList.push({
        longitude: parseFloat(this.state.longitude),
        latitude: parseFloat(this.state.latitude)
      })
    console.log(mapList);
    this.setState({markerList: mapList})
    // console.log(this.state.markerList);
   }

  render() {
    return (
      <View style={styles.containerMain}>
      <StatusBar
     backgroundColor="blue"
     barStyle="light-content"/>
      <TouchableOpacity onPress={this._pressButton.bind(this)}>
          <Text>点我跳回去</Text>
      </TouchableOpacity>
      <Text style={{marginTop:100}}>
          <Text style={styles.title}></Text>
          <Text style={styles.title}>经度: </Text>
          {this.state.longitude}
          <Text style={styles.title}>维度: </Text>
          {this.state.latitude}
        </Text>
      <Text>{this.state.longitude}</Text>
      <Text>{this.state.latitude}</Text>
      <MapView style={styles.map}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0003,
          longitudeDelta: 0.0003,
        }}
      >
      <MapView.Marker
        coordinate={this.state.markerList[0] ? this.state.markerList[0] : {}}
        title="开始"
        description="开始"
        ></MapView.Marker>
      <MapView.Marker
        coordinate={this.state.markerList[this.state.markerList.length - 1] ? this.state.markerList[this.state.markerList.length - 1] : {}}
        title="当前位置"
        description="当前位置"
        ></MapView.Marker>
      <MapView.Polyline
        coordinates={this.state.markerList}
        strokeColor="rgba(0,0,200,0.5)"
        strokeWidth={1}
      />


      </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    marginTop: 50,
    height: 600
  },
  button: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  input: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const onPressLearnMore = () => {
  Alert.alert('Button has been pressed!');
};
