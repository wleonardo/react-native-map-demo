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
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import PointMarker from '../component/point.ios.js';

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

var getTime = function() {
  return (new Date()).getTime();
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
      markerList: [],
      bikes: [],
      barcode: null,
      startTime: 0,
      duration: 0,
      distance: 0
    };
  }

  refreshDuration() {
    setTimeout(function() {
      var duration = getTime() - this.state.startTime;
      this.setState({ duration: duration });
      this.refreshDuration.call(this);
    }.bind(this), 1000)
  }


  componentDidMount() {
    this.setState({ startTime: getTime() })
    this.getGeo.call(this);
    this.refreshDuration.call(this);
    this.watchGeo.call(this);
  }

  watchGeo() {
    navigator.geolocation.watchPosition((position) => {
      var lastPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      if (this.state.markerList.length) {
        // this.isValidPosition.call(this, lastPosition).then(function(position) {
        //   console.log(position);
        // }).catch(function(error){
        //   console.log(error);
        // })
        var distance = getDistance(lastPosition, this.state.markerList[this.state.markerList.length - 1]);
        if (distance > 20) {
          this.setState({ lastPosition: lastPosition, distance: this.state.distance + distance });
          this.addMaker(lastPosition);
        }
      }
    }, () => {

    }, { enableHighAccuracy: false, maximumAge: 0});
  }

  isValidPosition(position) {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (newPosition) => {
          if (getDistance(newPosition, position) < 20) {
            resolve(position)
          }else{
            reject(false);
          }
        },
        (error) => {
          alert(error.message)
        }, { enableHighAccuracy: true, maximumAge: 0 }
      )
    });

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

        this.setState({ coordinate: lastPosition });
        this.addMaker(lastPosition)
      },
      (error) => alert(error.message), { enableHighAccuracy: true, maximumAge: 0 }
    );
  }



  getBackToPosition() {
    // var coordinate = JSON.parse(JSON.stringify(this.state.coordinate));
    // coordinate.latitudeDelta = 0.0003;
    // coordinate.longitudeDelta = 0.0003;
    // this.setState({ region: coordinate })
  }

  onRegionChange(data) {
    refeshBikeTimer && clearTimeout(refeshBikeTimer);
    refeshBikeTimer = setTimeout(function() {
      LATITUDE_DELTA = data.latitudeDelta;
      LONGITUDE_DELTA = data.longitudeDelta;
      var lastPosition = {
        latitude: this.state.coordinate.latitude,
        longitude: this.state.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.setState({ coordinate: lastPosition });
    }.bind(this), 300);
  }

  addMaker(position) {
    var mapList = JSON.parse(JSON.stringify(this.state.markerList));
    mapList.push(position)
    this.setState({ markerList: mapList })
  }

  render() {
    return (
      <View style={styles.containerMain}>
      <StatusBar
     backgroundColor="blue"
     barStyle="light-content"/>
      <MapView.Animated style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={this.state.coordinate}
        onRegionChange={this.onRegionChange.bind(this)}
      >

       <MapView.Marker.Animated coordinate={this.state.coordinate} >
          <PointMarker amount={'起'} />
      </MapView.Marker.Animated>

      <MapView.Polyline
        coordinates={this.state.markerList}
        strokeColor="rgba(255,90,95,10)"
        strokeWidth={3}
      ></MapView.Polyline>

      <MapView.Marker.Animated coordinate={this.state.markerList[this.state.markerList.length - 1]} >
          <PointMarker amount={'终'} />
      </MapView.Marker.Animated>
    
      </MapView.Animated>
      <View  style={styles.panel}>
        <Text style={{marginBottom: 20, color: '#c0c0c0'}}>157****9293</Text>
        <Text style={{marginBottom: 10, color: '#FF5A5F', fontSize: 30}}>{this.state.distance.toFixed(1)}</Text>
        <Text style={{marginBottom: 20, color: '#FF5A5F'}}>骑行距离(m)</Text>
        <View style={styles.subPannel}>
          <View style={styles.subPannelDetail}>
            <Text style={styles.subPannelDetailTitle}>{Math.ceil(this.state.duration / 60000)}</Text>
            <Text style={styles.subPannelDetailInfo}>骑行时间(min)</Text>
          </View>
          <View style={styles.subPannelDetail}>
            <Text style={styles.subPannelDetailTitle}>{Math.ceil(this.state.distance * 0.12)}</Text>
            <Text style={styles.subPannelDetailInfo}>节约炭排量(g)</Text>
          </View>
          <View style={styles.subPannelDetail}>
            <Text style={styles.subPannelDetailTitle}>{Math.ceil(this.state.distance * 0.02)}</Text>
            <Text style={styles.subPannelDetailInfo}>卡路里(kCal)</Text>
          </View>
        </View>
      </View>
      


      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1
  },
  map: {
    flex: 1
  },
  scannerBtn: {
    position: 'absolute',
    bottom: 30,
    left: Dimensions.get('window').width / 2,
    marginLeft: -80,
    width: 100,
    backgroundColor: '#FF5A5F',
    height: 60,
    width: 160,
    borderRadius: 30
  },
  scannerBtnText: {
    backgroundColor: 'transparent',
    lineHeight: 60,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
  input: {
    textAlign: 'center',
    marginBottom: 5,
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 230,
    backgroundColor: '#fff',
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  subPannel: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  subPannelDetail: {
    textAlign: 'center',
    color: '#c0c0c0',
    paddingLeft: 10,
    paddingRight: 10
  },
  subPannelDetailTitle: {
    textAlign: 'center',
    color: '#606060',
    fontSize: 20
  },
  subPannelDetailInfo: {
    textAlign: 'center',
    color: '#c0c0c0',
  },
  positionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 0.5,
    bottom: 30,
    left: 15,
    position: 'absolute'
  },
  positionBtnIner: {
    color: '#FFFFFF',
    fontSize: 13,
    width: 20,
    height: 20,
    borderRadius: 23,
    lineHeight: 45,
    textAlign: 'center',
    borderColor: '#626262',
    borderWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionBtnInerpoint: {
    width: 4,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#626262'
  }
});
