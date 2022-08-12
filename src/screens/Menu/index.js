import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import Home from '../Home';
import Capture from '../Capture';
import User from '../User';

import {COLORS, icons} from '../../constants';

const Tab = createBottomTabNavigator();

const MenuItem = (name, component, image, tabBarStyle) => {
  const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
    const isSelected = accessibilityState.selected;

    if (isSelected) {
      return (
        <View style={styles.selectedMenuContainer}>
          <TouchableOpacity style={styles.selectedMenuIcon} onPress={onPress}>
            {children}
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.menuIcon}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Screen
      name={name}
      component={component}
      options={{
        tabBarIcon: ({focused}) => {
          const _style = {
            width: 24,
            height: 24,
            tintColor: focused ? COLORS.white : COLORS.gray2,
          };
          return <Image source={image} resizeMode="contain" style={_style} />;
        },
        tabBarButton: props => <TabBarCustomButton {...props} />,
        tabBarStyle: {...tabBarStyle},
      }}
    />
  );
};

const Menu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      {/* Menu Items */}
      {MenuItem('Home', Home, icons.home)}
      {MenuItem('Capture', Capture, icons.camera, {display: 'none'})}
      {MenuItem('User', User, icons.user)}
    </Tab.Navigator>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
  },

  selectedMenuContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selectedMenuIcon: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
