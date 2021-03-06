import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const propTypes = {
  amount: PropTypes.number.isRequired
};


class PointMarker extends React.Component {
  render() {
    const { amount } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={[styles.amount]}>{amount}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

PointMarker.propTypes = propTypes;

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
    alignSelf: 'flex-start',
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
    color: '#FFFFFF',
    fontSize: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    lineHeight: 24,
    textAlign: 'center',
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

module.exports = PointMarker;