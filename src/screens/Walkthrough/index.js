import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {
  ButtonLarge,
  NutricekLogo,
  WalkthroughItem,
  WalkthroughDot,
} from '../../components';
import {COLORS, FONTS, images} from '../../constants';

const slides = [
  {
    image: images.illustration1,
    title: 'Take a Picture',
    text: 'Take a picture of your food to check its nutrition',
  },
  {
    image: images.illustration2,
    title: 'Nutrition Check',
    text: 'Check the nutrients contained in the food you eat',
  },
];

const Walkthrough = ({navigation}) => {
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const {width, height} = Dimensions.get('window');

  const setSliderPage = event => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);

    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const {currentPage: pageIndex} = sliderState;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <NutricekLogo />
        </View>
        <ScrollView
          style={styles.scrollView}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={event => {
            setSliderPage(event);
          }}>
          {slides.map(({image, title, text}, index) => {
            return (
              <WalkthroughItem
                key={index}
                width={width}
                height={height}
                image={image}
                title={title}
                text={text}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <WalkthroughDot key={index} index={index} pageIndex={pageIndex} />
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <ButtonLarge text="Get Started" />
        </TouchableOpacity>
        <View style={styles.accountContainer}>
          <Text style={styles.descText}>Already Have An Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signinText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Walkthrough;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    marginTop: 44,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 52,
  },
  scrollView: {
    flex: 1,
  },
  paginationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  accountContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  descText: {
    ...FONTS.body1,
    color: COLORS.gray,
  },
  signinText: {
    ...FONTS.body2,
    color: COLORS.primary,
  },
});
