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
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeInOpacity: new Animated.Value(1),
      loadingHeight: [1, 2, 3, 4, 5].map(() => new Animated.Value(40)), // 初始化3个值
      pointShow: [1, 2, 3].map(() => new Animated.Value(10)) // 初始化3个值
    };
  }

  componentDidMount() {

  }

  goback() {
    const { navigator } = this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  startAnimate() {
    Animated.sequence([ // 首先执行decay动画，结束后同时执行spring和twirl动画
      Animated.timing(this.state.fadeInOpacity, {
        toValue: 0, // 目标值
        duration: 2500, // 动画时间
        easing: Easing.linear // 缓动函数
      }),
      Animated.timing(this.state.fadeInOpacity, {
        toValue: 1, // 目标值
        duration: 2500, // 动画时间
        easing: Easing.linear // 缓动函数
      }),
    ]).start();
  }
  startAnimateLoading() {
    Animated.sequence([
      Animated.stagger(80, this.state.loadingHeight.map(height => {
        return Animated.timing(height, {
          toValue: 70,
          duration: 250, // 动画时间
          easing: Easing.linear // 缓动函数
        });
      }).concat(
        this.state.loadingHeight.map(height => {
          return Animated.timing(height, {
            toValue: 30,
            duration: 250, // 动画时间
            easing: Easing.linear // 缓动函数
          });
        })
      ))
    ]).start(() => {
      this.startAnimateLoading();
    });
  }

  startAnimatePoint() {
    Animated.sequence([
      Animated.stagger(100, this.state.pointShow.map(len => {
        return Animated.timing(len, {
          toValue: 10,
          duration: 250, // 动画时间
          easing: Easing.linear // 缓动函数
        });
      }).concat(
        this.state.pointShow.map(len => {
          return Animated.timing(len, {
            toValue: 1,
            duration: 250, // 动画时间
            easing: Easing.linear // 缓动函数
          });
        })
      ))
    ]).start(() => {
      this.startAnimatePoint();
    });
  }

  render() {
    return (
      <View style={styles.containerMain}>
      <StatusBar
      backgroundColor="blue"
      barStyle="default" ></StatusBar>

       <Animated.View style={[styles.demo, {opacity: this.state.fadeInOpacity}]}>
          <TouchableOpacity  onPress={this.startAnimate.bind(this)} activeOpacity={1}>
            <Text style={{fontSize: 30}}>悄悄的，我出现了</Text>
          </TouchableOpacity>
        </Animated.View>

         <View style={[styles.demo]}>
          <TouchableOpacity  onPress={this.startAnimateLoading.bind(this)} activeOpacity={1} style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
            {this.state.loadingHeight.map((val, key) => (
              <Animated.View style={[styles.loading, {height: val}]}></Animated.View>
            ))}
          </TouchableOpacity>
        </View>

        <View style={[styles.demo]}>
          <TouchableOpacity  onPress={this.startAnimatePoint.bind(this)} activeOpacity={1} style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
            {this.state.pointShow.map((val, key) => (
              <View style={styles.pointWapper}>
                <Animated.View style={[styles.point, {height: val, width: val}]}></Animated.View>
              </View>
            ))}
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingTop: 20
  },
  demo: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  },
  loading: {
    width: 10,
    height: 40,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: '#67CF22'
  },
  pointWapper: {
    width: 20,
    height: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#67CF22'
  }
});
