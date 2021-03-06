import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const propTypes = {
  amount: PropTypes.number.isRequired
};

class SelfMarker extends React.Component {
  render() {
    const { amount } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View style={[styles.amount]}></View>
        </View>
      </View>
    );
  }
}

SelfMarker.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: 30,
    height: 30
  },
  bubble: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 0.5,
  },
  amount: {
    width: 20,
    height: 20,
    borderRadius: 23,
    backgroundColor: '#2E7FFF'
  },

  dollar: {
    color: '#FFFFFF',
    fontSize: 10,
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

module.exports = SelfMarker;
