import {StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';

import {COLORS, FONTS} from '../../constants';

const WalkthroughItem = ({width, height, image, title, text}) => {
  return (
    <View style={{width, height, ...styles.container}}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default WalkthroughItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 282,
    height: 282,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black,
    marginTop: 24,
  },
  text: {
    ...FONTS.body1,
    color: COLORS.gray,
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 8,
  },
});
