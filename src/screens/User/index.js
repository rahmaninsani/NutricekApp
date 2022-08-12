import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';

import {COLORS, FONTFAMILY, images} from '../../constants';
import {ButtonLarge} from '../../components';

import {setUserSession} from '../../redux';
import {EncryptedSharedPreferencesService} from '../../services';

import {useSelector} from 'react-redux';

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {userSession} = useSelector(state => state.UserSessionReducer);

  const onPressSignOut = async () => {
    await EncryptedSharedPreferencesService.clearStorage();
    dispatch(
      setUserSession({
        name: null,
        email: null,
        accessToken: null,
        isSignedIn: false,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.body}>
        <Image source={images.avatar} style={styles.avatar} />
        <Text style={styles.name}>{userSession.name}</Text>
        <Text style={styles.email}>{userSession.email}</Text>
        <View style={styles.signOut}>
          <TouchableOpacity
            onPress={async () => {
              setIsLoading(true);
              await onPressSignOut();
              setIsLoading(false);
            }}
            disabled={isLoading}>
            <ButtonLarge text="Sign Out" isLoading={isLoading} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  header: {
    marginTop: 32,
  },
  title: {
    fontFamily: FONTFAMILY.siginikaMedium,
    fontSize: 28,
    color: COLORS.black,
  },
  body: {
    flex: 1,
    marginTop: 36,
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
  },
  name: {
    marginTop: 24,
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: 24,
    color: COLORS.black,
  },
  email: {
    marginTop: 8,
    fontFamily: FONTFAMILY.siginikaRegular,
    fontSize: 16,
    color: COLORS.gray4,
  },
  signOut: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
