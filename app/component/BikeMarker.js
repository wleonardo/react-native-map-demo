import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

const propTypes = {};


class BikeMarker extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Image style={styles.amount} source={require('../lib/img/bike.png')} resizeMode="contain" />
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

BikeMarker.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    width: 30,
    height: 30,
    alignItems: 'center',
    backgroundColor: '#FF5A5F',
    padding: 2,
    borderRadius: 15,
    borderColor: '#D23F44',
    borderWidth: 0.5,
  },
  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  amount: {
    width: 23,
    height: 23,
    borderRadius: 13,
    backgroundColor: 'transparent'
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#FF5A5F',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#D23F44',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = BikeMarker;
