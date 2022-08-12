import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

import {COLORS, FONTS} from '../../constants';

const NutricekLogoSecondary = () => {
  return (
    <View>
      <Text style={styles.text}>nutricek</Text>
    </View>
  );
};

export default NutricekLogoSecondary;

const styles = StyleSheet.create({
  text: {
    ...FONTS.logo,
    color: COLORS.secondary,
  },
});
