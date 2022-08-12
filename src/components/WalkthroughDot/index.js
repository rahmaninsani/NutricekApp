import {StyleSheet, View} from 'react-native';
import React from 'react';

const WalkthroughDot = ({index, pageIndex}) => {
  const style = {
    ...styles.dot,
    backgroundColor: pageIndex === index ? '#FDC55E' : '#FEEDC9',
    width: pageIndex === index ? 20 : 12,
    height: pageIndex === index ? 10 : 8,
  };

  return <View style={style} />;
};

export default WalkthroughDot;

const styles = StyleSheet.create({
  dot: {
    marginLeft: 10,
    borderRadius: 16,
  },
});
