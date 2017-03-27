/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';

import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Mycenter extends Component {
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
  componentDidMount() {}

  goBack() {
    const { navigator } = this.props;

    if (navigator) {
      navigator.pop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.topPannel}>
          <TouchableHighlight style={styles.backBtn} onPress={this.goBack.bind(this)}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableHighlight>
          <View style={styles.bikeWapper}>
            <View style={styles.bike}>
              <Icon name="bike" size={30} color="#ff585d" style={{width: 30, lineHeight: 30, height: 30, backgroundColor: 'transparent', textAlign: 'center'}} />
            </View>
          </View>
            <View style={styles.statistics}>
              <View style={styles.statisticsItem}>
                <Text style={styles.statisticsTitle}>23.0</Text>
                <Text style={styles.statisticsInfo}>累计骑行(公里)</Text>
              </View>
              <View style={styles.statisticsItem}>
                <Text style={styles.statisticsTitle}>2.7</Text>
                <Text style={styles.statisticsInfo}>节约碳排量(千克)</Text>
              </View>
              <View style={styles.statisticsItem}>
                <Text style={styles.statisticsTitle}>2152</Text>
                <Text style={styles.statisticsInfo}>运动成就(大卡)</Text>
              </View>
            </View>
          </View>
         <View style={styles.listWapper}>
          <View style={styles.list}>
            <Text style={styles.listText}>我的钱包</Text>
            <Text style={styles.listText}>3.0元</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listText}>我的优惠券</Text>
          </View>
         </View>
         <View style={styles.listWapper,{height: 180}}>
          <View style={styles.list}>
            <Text style={styles.listText}>我的行程</Text>
            <Text style={styles.listText}></Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listText}>邀请好友</Text>
          </View>
           <View style={styles.list}>
            <Text style={styles.listText}>设置</Text>
          </View>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfdf',
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 15
  },
  bikeWapper: {
    position: 'absolute',
    top: 67,
    left: Dimensions.get('window').width / 2 - 50,
    width: 106,
    height: 106,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 53,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bike: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topPannel: {
    backgroundColor: '#ff585d',
    height: 300,
    width: Dimensions.get('window').width,
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  statisticsItem: {
    paddingLeft: 10,
    paddingRight: 10
  },
  statisticsTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#606060',
    fontWeight: '500',
    paddingBottom: 5
  },
  statisticsInfo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#c0c0c0',
    fontWeight: '100'
  },
  listWapper: {
    height: 120,
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 0.5,
    height: 60,
    borderTopWidth: 0,
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  listText: {
    color: '#606060',
  }
});
