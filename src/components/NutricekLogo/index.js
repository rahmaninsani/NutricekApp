import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

import {COLORS, FONTS} from '../../constants';

const NutricekLogo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.redText}>nutri</Text>
      <Text style={styles.yellowText}>cek</Text>
    </View>
  );
};

export default NutricekLogo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  redText: {
    ...FONTS.logo,
    color: COLORS.primary,
  },
  yellowText: {
    ...FONTS.logo,
    color: COLORS.secondary,
  },
});
