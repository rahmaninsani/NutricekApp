import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';

import {COLORS, FONTFAMILY} from '../../constants';

const ProgressChart = ({progress, weight}) => {
  const centerText = () => {
    return (
      <View>
        <Text style={styles.title}>Total Calories</Text>
        <View style={styles.weightUnitContainer}>
          <Text style={styles.weight}>{weight}</Text>
          <Text style={styles.unit}> kcal</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Progress.Circle
        size={232}
        thickness={232 * 0.1}
        strokeCap={'round'}
        showsText={true}
        borderWidth={0}
        unfilledColor={COLORS.lightGray}
        direction={'counter-clockwise'}
        progress={progress}
        color={COLORS.primary}
        formatText={() => centerText()}
      />
    </View>
  );
};

export default ProgressChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTFAMILY.siginikaMedium,
    fontSize: 18,
    color: COLORS.black,
  },
  weightUnitContainer: {
    flexDirection: 'row',
    alignItems: 'space-around',
  },
  weight: {
    fontFamily: FONTFAMILY.siginikaMedium,
    fontSize: 36,
    color: COLORS.black,
  },
  unit: {
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: 16,
    color: COLORS.gray7,
    marginBottom: 4,
    marginStart: 4,
  },
});
