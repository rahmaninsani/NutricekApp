import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';

import {COLORS, FONTS} from '../../constants';

const ButtonLarge = ({text, isLoading = false}) => {
  const color = isLoading ? '#FFABB2' : COLORS.primary;

  return (
    <View style={{...styles.container, backgroundColor: color}}>
      {isLoading ? (
        <Progress.Circle size={40} indeterminate={true} color={'#FFFFFF'} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </View>
  );
};

export default ButtonLarge;

const styles = StyleSheet.create({
  container: {
    width: 290,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...FONTS.h1,
    color: COLORS.white,
  },
});
