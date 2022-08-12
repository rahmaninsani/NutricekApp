import React, {useEffect, useCallback, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  SplashScreen,
  Walkthrough,
  SignUp,
  SignIn,
  Menu,
  ScanResult,
} from '../screens';
import {setUserSession} from '../redux';
import {EncryptedSharedPreferencesService} from '../services';

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {userSession} = useSelector(state => state.UserSessionReducer);

  const dispatch = useDispatch();
  const loadUserSession = useCallback(async () => {
    try {
      const name = await EncryptedSharedPreferencesService.getItem('name');
      const email = await EncryptedSharedPreferencesService.getItem('email');
      const accessToken = await EncryptedSharedPreferencesService.getItem(
        'accessToken',
      );

      if (name && email && accessToken) {
        dispatch(
          setUserSession({
            name,
            email,
            accessToken,
            isSignedIn: true,
          }),
        );
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      return false;
    }
  }, []);

  useEffect(() => {
    loadUserSession();
  }, []);

  const Stack = createStackNavigator();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: 'transparent',
    },
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userSession.isSignedIn ? (
          <>
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="ScanResult" component={ScanResult} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Walkthrough"
              component={Walkthrough}
              options={{
                title: 'Sign in',
                animationTypeForReplace: userSession.isSignedIn
                  ? 'push'
                  : 'pop',
              }}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
