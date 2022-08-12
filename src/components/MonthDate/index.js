import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import moment from 'moment';

import {COLORS, FONTS} from '../../constants';

const MonthDate = ({
  item,
  selectedId,
  setSelectedId,
  setCalories,
  setCarbs,
  setProtein,
  setFat,
}) => {
  const {date, calories, carbs, protein, fat} = item;

  const backgroundColor = date === selectedId ? COLORS.primary : COLORS.gray5;
  const color = date === selectedId ? COLORS.white : COLORS.gray6;

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedId(date);
        setCalories(calories);
        setCarbs(carbs);
        setProtein(protein);
        setFat(fat);
      }}>
      <View style={{...styles.container, backgroundColor}}>
        <Text style={{...styles.month, color}}>
          {moment(date).format('MMM')}
        </Text>
        <Text style={{...styles.date, color}}>{moment(date).format('DD')}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MonthDate;

const styles = StyleSheet.create({
  container: {
    width: 47,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  month: {
    ...FONTS.body5,
  },
  date: {
    ...FONTS.body6,
  },
});
