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
const EARTH_RADIUS = 6378137;
var LATITUDE_DELTA = 0.0003;
var LONGITUDE_DELTA = 0.0003;

var refeshBikeTimer;

var firstTime = true;

var rad = function(d) {
  return d * Math.PI / 180;
}

var getDistance = function(p1, p2) {
  var radLat1 = rad(p1.latitude);
  var radLat2 = rad(p2.latitude);
  var a = radLat1 - radLat2;
  var b = rad(p1.longitude) - rad(p2.longitude);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
}

var getRandom = function() {
  var random = Math.random();
  return random > 0.5 ? random : 0 - random;
}

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
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markerList: [],
      bikes: [],
      clickFlag: 0.98
    };
  }


  componentDidMount() {
    firstTime = true;
    this.getGeo();
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


  getGeo() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lastPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };

        if (firstTime) {
          this.refeshBike(lastPosition.longitude, lastPosition.latitude);
          this.setState({ coordinate: lastPosition, region: lastPosition });
          setTimeout(function(){
            firstTime = false;
          }, 0);
          
        } else {
          this.setState({ coordinate: lastPosition });
        }

        // this.addMaker()
      },
      (error) => alert(error.message), { enableHighAccuracy: true, maximumAge: 0, distanceFilter: 1 }
    );
  }



  getBackToPosition() {
    var coordinate = JSON.parse(JSON.stringify(this.state.coordinate));
    coordinate.latitudeDelta = 0.0003;
    coordinate.longitudeDelta = 0.0003;
    this.refeshBike(coordinate.longitude, coordinate.latitude);
    this.setState({ region: coordinate })
  }

  refeshBike(longitude, latitude) {
    var bikes = [];
    longitude = longitude || this.state.region.longitude;
    latitude = latitude || this.state.region.latitude;

    for (var i = 0; i < 10; i++) {

      var coordinate = {
        longitude: longitude + getRandom() / 1000,
        latitude: latitude + getRandom() / 1000
      }
      var bikeInfo = {
        coordinate: coordinate,
        distance: getDistance(coordinate, this.state.region).toString()
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
  onRegionChange(data) {
    if (!firstTime) {
      LATITUDE_DELTA = data.latitudeDelta;
      LONGITUDE_DELTA = data.longitudeDelta;
      this.setState({ region: data });
      refeshBikeTimer && clearTimeout(refeshBikeTimer);
      refeshBikeTimer = setTimeout(function() {
        this.refeshBike();
      }.bind(this), 300);
    }
  }

  render() {
    return (
      <View style={styles.containerMain}>
      <StatusBar
     backgroundColor="blue"
     barStyle="light-content"/>
      <MapView.Animated style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
      >
      {this.state.bikes.map(bike => (
          <MapView.Marker.Animated coordinate={bike.coordinate} title="可用" description={'车辆距您'+ bike.distance + '米'} >
            <PriceMarker amount={1} />
          </MapView.Marker.Animated>
      ))}


      <MapView.Marker.Animated 
      coordinate={this.state.coordinate} >
          <SelfMarker amount={99} />
      </MapView.Marker.Animated>

      <MapView.Marker.Animated
        coordinate={this.state.region}
        title="当前位置"
        description="当前位置"
        ></MapView.Marker.Animated>

      <MapView.Polyline
        coordinates={this.state.markerList}
        strokeColor="rgba(0,0,200,0.5)"
        strokeWidth={1}
      />
    

      </MapView.Animated>
      <TouchableOpacity onPress={this._pressButton.bind(this)} style={{marginTop:50}}>
          <Text>点我跳回去</Text>
      </TouchableOpacity>

       <TouchableOpacity onPress={this.getBackToPosition.bind(this)} style={{position: 'absolute', bottom: 30, left: 30}}>
          <Text>回到定位</Text>
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
