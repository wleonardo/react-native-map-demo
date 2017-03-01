import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const propTypes = {
  fontSize: PropTypes.number,
};

const defaultProps = {
  fontSize: 13,
};

class PositionButton extends React.Component {
  render() {
    const { fontSize } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View style={[styles.amount, { fontSize }]}>
            <View style={styles.point}></View>
          </View>
        </View>
      </View>
    );
  }
}

PositionButton.propTypes = propTypes;
PositionButton.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 50,
    width: 50
  },
  bubble: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 0.5,
  },
  amount: {
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
  point: {
    width: 4,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#626262'
  }
});

module.exports = PositionButton;