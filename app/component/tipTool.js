import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

const propTypes = {};

class TipTool extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.textInfo}>狂欢送！单车到处借</Text>
      </View>
    );
  }
}

TipTool.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 50,
    position: 'absolute',
    top: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  textInfo: {
    color: '#fff'
  }
});

module.exports = TipTool;
