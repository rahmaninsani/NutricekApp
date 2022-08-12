import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import {setFoodNutrition} from '../../redux';
import {COLORS, FONTFAMILY} from '../../constants';
import {ButtonLarge} from '../../components';

import BackIcon from '../../assets/icons/arrow-left.svg';

import {NutricekService} from '../../services';

const ScanResult = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {foodNutrition} = useSelector(state => state.FoodNutritionReducer);

  const onPressBack = async () => {
    await NutricekService.deleteFood(foodNutrition.id);
    navigation.goBack();
  };

  const onPressSave = () => {
    dispatch(
      setFoodNutrition({
        id: null,
        foodName: null,
        foodNutritions: null,
        imagePath: null,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={{uri: `file://${foodNutrition.imagePath}`}}
          style={styles.headerImage}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1.4}}
            colors={['transparent', COLORS.black]}
            style={styles.linearGradient}>
            <TouchableOpacity onPress={onPressBack}>
              <BackIcon {...styles.back} />
            </TouchableOpacity>
            <Text style={styles.foodName}>{foodNutrition.foodName}</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.body}>
        <View style={styles.nutrients}>
          {foodNutrition.foodNutritions?.map(({name, weight, unit}, index) => {
            return (
              <View key={index}>
                <Text style={styles.nutrientItemTitle}>{name}</Text>
                <Text style={styles.nutrientItemWeight}>
                  {weight}
                  {unit}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.save}>
          <TouchableOpacity
            onPress={() => {
              setIsLoading(true);
              onPressSave();
              setIsLoading(false);
              navigation.navigate('Home');
            }}
            disabled={isLoading}>
            <ButtonLarge text="Save" isLoading={isLoading} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScanResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    alignItems: 'center',
  },
  back: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    fill: COLORS.white,
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: 255,
  },
  linearGradient: {
    height: 255,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  foodName: {
    fontFamily: FONTFAMILY.siginikaSemiBold,
    color: COLORS.white,
    fontSize: 36,
  },
  body: {
    paddingTop: 36,
    flex: 1,
  },
  nutrients: {
    width: Dimensions.get('window').width,
    height: 110,
    backgroundColor: COLORS.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
  },
  nutrientItemTitle: {
    fontFamily: FONTFAMILY.siginikaRegular,
    color: COLORS.primary,
    fontSize: 16,
  },
  nutrientItemWeight: {
    fontFamily: FONTFAMILY.siginikaRegular,
    color: COLORS.primary,
    fontSize: 24,
  },
  save: {
    position: 'absolute',
    bottom: 40,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
