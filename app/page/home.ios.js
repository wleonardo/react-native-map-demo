/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';

import {
  NativeModules,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Switch,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import BikeMarker from '../component/BikeMarker.js';

import CenterPoint from '../component/centerPoint.js';

import SelfMarker from '../component/selfMarker.js';

import PositionButton from '../component/PositionButton.js';

import TipTool from '../component/tipTool.js';

import ScannerPage from './scanner.ios.js';

import RecordPage from './record.ios.js';

import Mycenter from './my-center.js';

import AnimateDemo from './animate-demo.js';

import ScrollView from './scroll-view.js';

import SideMenu from '../component/side-menu/react-native-side-menu';

const Menu = require('../component/side-menu/Menu');

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
      directions: [],
      bikes: [],
      barcode: null,
      title: 'Bike',
      fadeInOpacity: new Animated.Value(0)
    };
  }

  refeshGeoLocation(position) {
    var lastPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    if (firstTime) {
      this.refeshBike(lastPosition.longitude, lastPosition.latitude);
      this.setState({ coordinate: lastPosition, region: lastPosition });
      setTimeout(function() {
        firstTime = false;
      }, 0);
    } else {
      this.setState({ coordinate: lastPosition });
    }
  }


  componentDidMount() {
    const { navigator } = this.props;
    firstTime = true;
    this.getGeo();
    this.watchGeo();
    console.log(NativeModules);
    console.log(NativeModules.MyCustomModule);
  }

  toBike(bikeinfo) {
    return function() {
      console.log(bikeinfo)
      var region = this.state.region;
      var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + region.latitude + ',' + region.longitude + '&destination=' + bikeinfo.coordinate.latitude + ',' + bikeinfo.coordinate.longitude + '&mode=walking&key=AIzaSyAehxV6fSgrs6xDCH-2l-yElYW0OUekOwA';
      fetch(url).then((response) => response.json())
        .then((responseJson) => {
          var directions = [];
          var routes = responseJson.routes[0].legs[0];
          directions.push(routes.start_location);
          routes.steps.forEach(function(v) {
            directions.push(v.start_location);
            directions.push(v.end_location);
          })
          directions.push(routes.end_location);
          console.log(directions);
          directions.forEach(function(v, k) {
            directions[k].latitude = v.lat;
            directions[k].longitude = v.lng;
          });

          this.setState({ directions, directions });
        })
        .catch((error) => {
          console.error(error);
        });
    }.bind(this);
  }

  watchGeo() {
    navigator.geolocation.watchPosition((position) => {
      this.refeshGeoLocation.call(this, position)
    }, () => {}, { enableHighAccuracy: true, maximumAge: 0, distanceFilter: 1 });
  }


  getGeo() {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.refeshGeoLocation(position)
      },
      (error) => alert(JSON.stringify(error)), { enableHighAccuracy: true, maximumAge: 0, distanceFilter: 1 }
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

  addMaker() {
    var mapList = JSON.parse(JSON.stringify(this.state.markerList));
    mapList.push(this.state.coordinate)
    this.setState({ markerList: mapList })
  }
  onRegionChange(data) {
    if (!firstTime) {
      refeshBikeTimer && clearTimeout(refeshBikeTimer);
      refeshBikeTimer = setTimeout(function() {
        LATITUDE_DELTA = data.latitudeDelta;
        LONGITUDE_DELTA = data.longitudeDelta;
        this.setState({ region: data });
        this.refeshBike();
      }.bind(this), 300);
    }
  }

  barcodeSanner() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if (navigator) {
      navigator.push({
        name: 'RecordPage',
        component: RecordPage
      });
    }
  }

  gotoMyCenter() {
    const { navigator } = this.props;
    if (navigator) {
      navigator.push({
        name: 'Mycenter',
        component: Mycenter
      });
    }
  }

  gotoAnimateDemo() {
    const { navigator } = this.props;

    if (navigator) {
      navigator.push({
        name: 'AnimateDemo',
        component: AnimateDemo
      });
    }
  }

  gotoScrollView() {
    const { navigator } = this.props;

    if (navigator) {
      navigator.push({
        name: 'ScrollView',
        component: ScrollView
      });
    }
  }

  render() {
    // const menu = <Menu navigator={navigator}/>;
    // console.log(menu);
    return (
      <View style={styles.containerMain}>
        <StatusBar
        backgroundColor="blue"
        barStyle="default" ></StatusBar>

        <View style={styles.navigator}>  
          <Text style={{textAlign: 'center', color: '#FF5A5F', fontSize: 18, fontWeight: '500'}}>{ this.state.title }</Text>
          <TouchableHighlight onPress={this.gotoMyCenter.bind(this)} style={{position: 'absolute', left: 15, top: 5}}>
            <Icon name="account" size={30} color="#c0c0c0" />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.gotoScrollView.bind(this)} style={{position: 'absolute', right: 50, top: 5}}>
            <Icon name="access-point" size={30} color="#c0c0c0" />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.gotoAnimateDemo.bind(this)} style={{position: 'absolute', right: 15, top: 5}}>
            <Icon name="candycane" size={30} color="#c0c0c0" />
          </TouchableHighlight>
          
        </View>
        <MapView style={styles.map}
          region={this.state.region}
          provider={PROVIDER_GOOGLE}
          onRegionChange={this.onRegionChange.bind(this)}
        >
        {this.state.bikes.map((bike, key) => (
            <MapView.Marker.Animated key={key} onPress={this.toBike.call(this, bike)} coordinate={bike.coordinate} title="可用" description={'车辆距您'+ bike.distance + '米'} >
              <BikeMarker />
            </MapView.Marker.Animated>
        ))}


        <MapView.Marker.Animated 
        coordinate={this.state.coordinate}>
            <SelfMarker amount={99} />
        </MapView.Marker.Animated>

        </MapView>

        <TipTool></TipTool>

        <TouchableOpacity  onPress={this.getBackToPosition.bind(this)} style={styles.centerPoint}>
          <CenterPoint style={styles.centerPoint}></CenterPoint>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={this.barcodeSanner.bind(this)} style={styles.scannerBtn}>
            <Text style={styles.scannerBtnText}>扫描</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={this.getBackToPosition.bind(this)} style={styles.positionBtn}>
          <View  style={styles.positionBtnIner}>
            <View style={styles.positionBtnInerpoint}></View>
          </View>
        </TouchableOpacity>
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
  navigator: {
    height: 80,
    top: 30,
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    paddingTop: 10
  },
  centerPoint: {
    position: 'absolute',
    top: 30,
    left: Dimensions.get('window').width / 2 - 40,
    top: Dimensions.get('window').height / 2 - 20
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  scannerBtnText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 18
  },
  input: {
    textAlign: 'center',
    marginBottom: 5,
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
    width: 20,
    height: 20,
    borderRadius: 23,
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
