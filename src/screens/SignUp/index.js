import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

import BackIcon from '../../assets/icons/arrow-left.svg';
import {COLORS, FONTS, SIZES, icons, FONTFAMILY} from '../../constants';
import {ButtonLarge} from '../../components';

import {NutricekService} from '../../services';

const SignUp = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNameBlank, setIsNameBlank] = useState(false);
  const [isEmailBlank, setIsEmailBlank] = useState(false);
  const [isPasswordBlank, setIsPasswordBlank] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPressSignUp = async () => {
    try {
      const data = {
        name,
        email,
        password,
      };

      await NutricekService.signup(data);

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      return false;
    }
  };

  function renderForm() {
    return (
      <View style={styles.formContainer}>
        {/* Full Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.icon} source={icons.inputUser} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={COLORS.gray4}
              value={name}
              onChangeText={value => {
                setIsNameBlank(false);
                setName(value);
              }}
              borderColor={isNameBlank ? COLORS.primary : COLORS.gray2}
            />
          </View>
          {isNameBlank && (
            <Text style={styles.required}>Full Name is required</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.icon} source={icons.inputEmail} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.gray4}
              value={email}
              onChangeText={value => {
                setIsEmailBlank(false);
                setEmail(value);
              }}
              borderColor={isEmailBlank ? COLORS.primary : COLORS.gray2}
            />
          </View>
          {isEmailBlank && (
            <Text style={styles.required}>Email is required</Text>
          )}
        </View>

        {/* Password */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.icon} source={icons.inputLock} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor={COLORS.gray4}
              value={password}
              onChangeText={value => {
                setIsPasswordBlank(false);
                setPassword(value);
              }}
              borderColor={isPasswordBlank ? COLORS.primary : COLORS.gray2}
            />
            <TouchableOpacity
              style={styles.eyeContainer}
              onPress={() => setShowPassword(!showPassword)}>
              <Image
                style={styles.eye}
                source={showPassword ? icons.eyeOff : icons.eye}
              />
            </TouchableOpacity>
          </View>
          {isPasswordBlank && (
            <Text style={styles.required}>Password is required</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon {...styles.back} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign Up</Text>
        {renderForm()}
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={async () => {
            if (
              name.trim() === '' ||
              email.trim() === '' ||
              password.trim() === ''
            ) {
              if (name.trim() === '') {
                setIsNameBlank(true);
              }
              if (email.trim() === '') {
                setIsEmailBlank(true);
              }
              if (password.trim() === '') {
                setIsPasswordBlank(true);
              }
              return;
            }

            setIsLoading(true);
            await onPressSignUp();
            setIsLoading(false);
            navigation.navigate('SignIn');
          }}
          disabled={isLoading}>
          <ButtonLarge text="Sign Up" isLoading={isLoading} />
        </TouchableOpacity>
        <View style={styles.accountContainer}>
          <Text style={styles.descText}>Already Have An Acount? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signinText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 20,
  },
  back: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    fill: COLORS.black,
  },
  contentContainer: {
    flex: 1,
    marginTop: SIZES.size11,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 40,
    flex: 1,
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    color: COLORS.gray4,
    ...FONTS.body3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  required: {
    fontFamily: FONTFAMILY.siginikaRegular,
    color: COLORS.primary,
    fontSize: 12,
  },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginVertical: 12,
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 20,
    ...FONTS.body3,
    color: '#A1A1A1',
  },
  eyeContainer: {
    position: 'absolute',
    right: 16,
  },
  eye: {
    width: 24,
    height: 24,
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
