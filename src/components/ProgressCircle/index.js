import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';

import {COLORS, FONTS, FONTFAMILY} from '../../constants';

const ProgressChart = ({title, progress, weight, color}) => {
  const centerText = () => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.weight}>{weight}</Text>
        <Text style={styles.unit}> g</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Progress.Circle
        size={80}
        thickness={80 * 0.1}
        strokeCap={'round'}
        showsText={true}
        borderWidth={0}
        unfilledColor={COLORS.lightGray}
        progress={progress}
        color={color}
        formatText={() => centerText()}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ProgressChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  weight: {
    fontFamily: FONTFAMILY.siginikaMedium,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.black,
    textAlign: 'center',
  },
  unit: {
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.gray4,
    textAlign: 'center',
  },
  title: {
    marginTop: 8,
    ...FONTS.body8,
    color: COLORS.black,
    textAlign: 'center',
  },
});
