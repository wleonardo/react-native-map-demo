/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';

import MapView from 'react-native-maps';

import PriceMarker from './PriceMarker';

import SelfMarker from './selfMarker.js';

import PositionButton from './PositionButton.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Switch,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
  Animated
} from 'react-native';

// import {
//   Accelerometer,
//   Gyroscope,
//   Magnetometer
// } from 'NativeModules';
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0003;
const LONGITUDE_DELTA = 0.0003;


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      // region: new MapView.AnimatedRegion({
      //   latitude: LATITUDE,
      //   longitude: LONGITUDE,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA,
      // }),
      markerList: [],
      bikes: [],
      clickFlag: 0.98
    };
    alert('e12e21');
  }


  getGeo() {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        var lastPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.setState({ coordinate: lastPosition });

        // this.setState({ coordinate: { latitude: position.coords.latitude, longitude: position.coords.longitude } });
        // this.setState({ longitude: position.coords.longitude });

        this.addMaker()
        this.refeshBike(position.coords.longitude, position.coords.latitude);
      },
      (error) => alert(error.message), { enableHighAccuracy: true, maximumAge: 0, distanceFilter: 1 }
    );
  }

  refeshPosition() {
    this.setState({ clickFlag: this.getRandom() })
    this.getGeo();
  }

  componentDidMount() {
    const { coordinate } = this.state;
    // coordinate = JSON.parse(coordinate);
    // coordinate.stopAnimation();
    //this.getGeo();
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   var lastPosition = JSON.stringify(position);
    //   this.setState({ lastPosition });
    //   this.setState({ longitude: position.coords.longitude });
    //   this.setState({ latitude: position.coords.latitude });
    //   this.addMaker()
    //   this.refeshBike(position.coords.longitude, position.coords.latitude)
    // }, () => {

    // }, { enableHighAccuracy: true, maximumAge: 0, distanceFilter: 1 });
  }

  getRandom() {
    var random = Math.random();
    return random > 0.5 ? random : 0 - random;
  }

  refeshBike(longitude, latitude) {
    var bikes = [];
    for (var i = 0; i < 10; i++) {

      var coordinate = {
        longitude: longitude + this.getRandom() / 1000,
        latitude: latitude + this.getRandom() / 1000
      }
      var bikeInfo = {
        coordinate: coordinate
      }

      bikes.push(bikeInfo);
    }
    this.setState({ bikes: bikes });
  }

  _pressButton() {
    const { navigator } = this.props;
    if (navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
      navigator.pop();
    }
  }
  addMaker() {
    var mapList = JSON.parse(JSON.stringify(this.state.markerList));
    mapList.push(this.state.coordinate)
    this.setState({ markerList: mapList })
  }
  onRegionChange() {
    alert(123);
  }

  render() {
    return (
      <View style={styles.containerMain}>
      <StatusBar
     backgroundColor="blue"
     barStyle="light-content"/>
      <MapView.Animated style={styles.map}
        region={this.state.coordinate}
        onRegionChange={this.onRegionChange}
      >
      {this.state.bikes.map(bike => (

          <MapView.Marker coordinate={bike.coordinate} >
            <PriceMarker amount={99} />
          </MapView.Marker>
      ))}
      <MapView.Marker
        coordinate={this.state.markerList[0] ? this.state.markerList[0] : {}}
        title="开始"
        description="开始"
        ></MapView.Marker>

      <MapView.Marker.Animated coordinate={this.state.coordinate} >
          <SelfMarker amount={99} />
      </MapView.Marker.Animated>

      <MapView.Polyline
        coordinates={this.state.markerList}
        strokeColor="rgba(0,0,200,0.5)"
        strokeWidth={1}
      />
    

      </MapView.Animated>
      <TouchableOpacity onPress={this._pressButton.bind(this)} style={{marginTop:50}}>
          <Text>点我跳回去</Text>
      </TouchableOpacity>
      <Text style={{marginTop:100}}>
          <Text style={styles.title}></Text>
          <Text style={styles.title}>经度: </Text>
          {this.state.coordinate.longitude}
          <Text style={styles.title}>维度: </Text>
          {this.state.coordinate.latitude}
        </Text>
      <Text>{this.state.longitude}</Text>
      <Text>{this.state.latitude}</Text>
      <Text>{this.state.clickFlag}</Text>

       <TouchableOpacity onPress={this.refeshPosition.bind(this)} style={{position: 'absolute', bottom: 30, left: 30}}>
          <Text>lalala</Text>
      </TouchableOpacity>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    marginTop: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: 30,
    paddingRight: 30
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const onPressLearnMore = () => {
  Alert.alert('Button has been pressed!');
};
