import React from 'react';
import {View, StyleSheet} from 'react-native';

import {COLORS, SIZES} from '../../constants';
import {NutricekLogoSecondary} from '../../components';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <NutricekLogoSecondary />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    marginTop: SIZES.size11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
