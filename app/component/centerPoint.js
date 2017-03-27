import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const propTypes = {};

class CenterMarker extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={[styles.amount]}>附近单车</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
        <View style={styles.pos} />
      </View>
    );
  }
}

CenterMarker.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bubble: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 30,
    backgroundColor: '#2D2E36',
    padding: 2,
    borderRadius: 15,
    borderColor: '#2D2E36',
    borderWidth: 0.5,
  },
  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
    backgroundColor: 'transparent'
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#2D2E36',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#2D2E36',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  pos: {
    height: 10,
    width: 2,
    marginTop: -4,
    alignSelf: 'center',
    backgroundColor: '#2D2E36',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 6,
    }
  }
});

module.exports = CenterMarker;
