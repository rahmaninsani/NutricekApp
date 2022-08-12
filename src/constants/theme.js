import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#F54748',
  secondary: '#FDC55E',
  blue: '#99B1F5',
  orange: '#FFAB47',
  red: '#FF6B78',
  lightRed: '#FFC0B8',
  yellow: '#FFF8EE',

  white: '#FFFFFF',
  black: '#000000',
  gray: 'rgba(0, 0, 0, 0.45)',
  gray2: '#DDDDDD',
  gray3: '#D9D9D9',
  gray4: '#A1A1A1',
  gray5: '#F4F4F4',
  gray6: '#C1C1C1',
  gray7: '#D4D4D4',
  lightGray: '#F4F6FA',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // Font sizes
  logo: 28,
  h1: 24,
  body1: 16,
  body2: 14,

  // app dimensions
  width,
  height,

  size1: 4,
  size2: 8,
  size3: 12,
  size4: 16,
  size5: 20,
  size6: 24,
  size7: 28,
  size8: 32,
  size9: 36,
  size10: 40,
  size11: 44,
  size12: 48,
  size13: 52,
  size14: 56,
  size15: 60,
  size16: 64,
};

export const FONTFAMILY = {
  nunitoExtraBold: 'Nunito-ExtraBold',
  siginikaSemiBold: 'Signika-SemiBold',
  siginikaMedium: 'Signika-Medium',
  siginikaRegular: 'Signika-Regular',
};

export const FONTS = {
  logo: {
    fontFamily: FONTFAMILY.nunitoExtraBold,
    fontSize: SIZES.logo,
  },
  h1: {
    fontFamily: FONTFAMILY.siginikaSemiBold,
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  body1: {
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: SIZES.body1,
    lineHeight: 24,
  },
  body2: {
    fontFamily: FONTFAMILY.siginikaSemiBold,
    fontSize: SIZES.body1,
    lineHeight: 24,
  },
  body3: {
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: SIZES.body1,
  },
  body4: {
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: SIZES.size5,
    lineHeight: SIZES.size7,
  },
  body5: {
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: SIZES.size3,
    lineHeight: SIZES.size5,
  },
  body6: {
    fontFamily: FONTFAMILY.siginikaMedium,
    fontSize: SIZES.size4,
    lineHeight: SIZES.size6,
  },
  body7: {
    fontFamily: FONTFAMILY.siginikaMedium,
    fontSize: 14,
    lineHeight: SIZES.size6,
  },
  body8: {
    fontFamily: FONTFAMILY.siginikaMedium,
    fontSize: 14,
    lineHeight: SIZES.size6,
  },
  unit: {
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: SIZES.size4,
    lineHeight: SIZES.size6,
  },
};

const appTheme = {COLORS, SIZES, FONTS, FONTFAMILY};

export default appTheme;
