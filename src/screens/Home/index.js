import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';

import {NutricekService} from '../../services';
import {COLORS, FONTS, FONTFAMILY} from '../../constants';
import {MonthDate, ProgressCircle, ProgressCircleLarge} from '../../components';

const Home = () => {
  const isFocused = useIsFocused();
  const {userSession} = useSelector(state => state.UserSessionReducer);
  const [nutritions, setNutritions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);

  const renderFlatListItem = ({item}) => {
    const props = {
      item,
      selectedId,
      setSelectedId,
      setCalories,
      setCarbs,
      setProtein,
      setFat,
    };

    return (
      <View style={styles.monthDateContainer}>
        <MonthDate {...props} />
      </View>
    );
  };

  useEffect(() => {
    const getNutrition = async () => {
      const {data} = await NutricekService.getAllFoodNutrition();
      const results = data.data.nutritions.reverse();

      if (results.length < 1) {
        return;
      }

      setNutritions([...results]);
      setSelectedId(results[0].date);
      setCalories(results[0].calories);
      setCarbs(results[0].carbs);
      setProtein(results[0].protein);
      setFat(results[0].fat);
    };

    getNutrition();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello {userSession.name?.split(' ')[0]},
        </Text>
        <Text style={styles.desc}>
          Take a Picture of Your Food and Check the Nutrition
        </Text>
      </View>

      <View style={styles.flatList}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nutritions}
          renderItem={renderFlatListItem}
          keyExtractor={item => item.date}
          extraData={selectedId}
          inverted={true}
        />
      </View>

      <View style={styles.body}>
        <ProgressCircleLarge progress={calories / 2000} weight={calories} />

        <View style={styles.progressContainer}>
          <ProgressCircle
            title={'Carbs'}
            progress={carbs / 325}
            weight={carbs}
            color={COLORS.blue}
          />
          <ProgressCircle
            title={'Protein'}
            progress={protein / 75}
            weight={protein}
            color={COLORS.secondary}
          />
          <ProgressCircle
            title={'Fat'}
            progress={fat / 44}
            weight={fat}
            color={COLORS.red}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    alignItems: 'center',
    marginHorizontal: 28,
    paddingHorizontal: 24,
  },
  greeting: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginTop: 36,
  },
  desc: {
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 12,
    color: '#7B7B7B',
  },
  flatList: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  monthDateContainer: {
    marginLeft: 16,
  },
  body: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  progressContainer: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
