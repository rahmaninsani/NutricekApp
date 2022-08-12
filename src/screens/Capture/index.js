import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Image,
  PermissionsAndroid,
  Text,
} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import CameraRoll from '@react-native-community/cameraroll';
import FormData from 'form-data';

import {setFoodNutrition} from '../../redux';
import {COLORS, FONTFAMILY} from '../../constants';
import {ButtonLarge} from '../../components';

import CloseIcon from '../../assets/icons/close.svg';

import {NutricekService} from '../../services';

const Capture = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const {foodNutrition} = useSelector(state => state.FoodNutritionReducer);

  // const [camView, setCamView] = useState('back');

  const getCameraPermission = async () => {
    await Camera.getCameraPermissionStatus();
    await Camera.requestCameraPermission();
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  const devices = useCameraDevices();
  // const device = camView === 'back' ? devices.back : devices.front;
  const device = devices.back;
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const isActive = isFocused;

  const requestSavePermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    if (permission == null) {
      return false;
    }
    let hasPermission = await PermissionsAndroid.check(permission);

    if (!hasPermission) {
      const permissionRequestResult = await PermissionsAndroid.request(
        permission,
      );
      hasPermission = permissionRequestResult === 'granted';
    }
    return hasPermission;
  };

  const takePhoto = async () => {
    try {
      if (cameraRef.current == null) {
        throw new Error('Camera Ref is Null');
      }

      const takePhotoOptions = {
        photoCodec: 'jpeg',
        qualityPrioritization: 'balanced',
        quality: 70,
        enableAutoStabilization: true,
        skipMetadata: true,
      };

      const photo = await cameraRef.current.takePhoto(takePhotoOptions);
      dispatch(setFoodNutrition({imagePath: photo.path}));

      const hasPermission = await requestSavePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission denied!',
          'Vision Camera does not have permission to save the media to your camera roll.',
        );
        return;
      }

      await CameraRoll.save(`file://${photo.path}`, {
        type: 'photo',
      });
    } catch (error) {
      Alert.alert(`Error: ${error}`);
    }
  };

  const onContinue = async () => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: `file://${foodNutrition.imagePath}`,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const {
        data: {data},
      } = await NutricekService.addFood(formData);

      dispatch(
        setFoodNutrition({
          id: data.id,
          foodName: data.foodName,
          foodNutritions: data.foodNutritions,
        }),
      );

      navigation.navigate('ScanResult');
    } catch (error) {
      console.log(error);
    }
  };

  if (device == null) {
    return null;
  }

  const CaptureMode = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <CloseIcon {...styles.close} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={takePhoto}>
            <View style={styles.lightRedCircle}>
              <View style={styles.redCircle} />
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const CaptureResult = () => {
    return (
      <View style={styles.captureResultContainer}>
        <View style={styles.captureResultHeader}>
          {!isLoading && (
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={() =>
                dispatch(
                  setFoodNutrition({
                    id: null,
                    foodName: null,
                    foodNutritions: null,
                    imagePath: null,
                  }),
                )
              }>
              <CloseIcon {...styles.closeBlack} />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Food Picture</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: `file://${foodNutrition.imagePath}`}}
            style={styles.image}
          />
        </View>
        <View style={styles.continue}>
          <TouchableOpacity
            onPress={async () => {
              setIsLoading(true);
              await onContinue();
              setIsLoading(false);
            }}
            disabled={isLoading}>
            <ButtonLarge text="Continue" isLoading={isLoading} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        device={device}
        photo={true}
        isActive={isActive}
        style={StyleSheet.absoluteFill}
      />
      {foodNutrition.imagePath === null && <CaptureMode />}
      {foodNutrition.imagePath !== null && <CaptureResult />}
    </View>
  );
};

export default Capture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 28,
  },
  close: {
    width: 40,
    height: 40,
    fill: COLORS.white,
  },
  actionContainer: {
    height: 168,
    padding: 12,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightRedCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.lightRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  captureResultContainer: {
    padding: 12,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: 72,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  captureResultHeader: {
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
  },
  closeContainer: {
    position: 'absolute',
  },
  closeBlack: {
    width: 40,
    height: 40,
    fill: COLORS.black,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.siginikaSemiBold,
    color: COLORS.black,
    fontSize: 24,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 12,
  },
  continue: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
});
