import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {height, width} from 'react-native-dimension';
import {Colors, images} from '../constants';
import InputContainer from '../componets/InputContainers';
import Button from '../componets/Button';
import Button3 from '../componets/Button3';

import InputText from '../componets/InputText';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignInScreen = ({navigation}) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  const {setUserId} = useContext(AuthContext);

  const onSignIn = values => {
    setIsloading(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        // storeData(response.user.uid);
        //console.log('User signed in!', response.user.uid);
        setUserId(response.user.uid);
        setIsloading(true);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!', error);
        }

        console.error('------------------', error);
        setIsloading(false);
        setError(error);
        //AuthContext;
      });
  };

  // const storeData = async uid => {
  //   try {
  //     await AsyncStorage.setItem('UserId', uid);
  //   } catch (error) {}
  // };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),
  });

  console.log('******************', error);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.signin}>
          <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
            <Icon
              name="arrow-left"
              type="material-community"
              color={Colors.blue}
              size={25}
            />
          </TouchableOpacity>
          <Text style={styles.singin}>Sign in</Text>
        </View>

        <View style={styles.InputContainer}>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={values => onSignIn(values)}
            // onSubmit={values => console.log('ddddddddddd', values)}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, errors}) => (
              <>
                <InputContainer
                  placeyourtext="Enter your email"
                  name="email"
                  onChangeText={handleChange('email')}
                  // value={email}
                />
                <Text style={{color: 'red', paddingLeft: 37}}>
                  {errors.email}
                </Text>
                <InputContainer
                  placeyourtext="Enter your password"
                  name="lock"
                  onChangeText={handleChange('password')}
                  keyboardType="numeric"
                />

                <Text style={{color: 'red', paddingLeft: 37}}>
                  {errors.password}
                </Text>
                {isloading ? (
                  <>
                    <ActivityIndicator
                      color={Colors.blue}
                      size={30}
                      style={styles.loader}
                    />
                    <Button3 />
                  </>
                ) : (
                  <>
                    <Button title="Sign In" onPress={handleSubmit} />
                  </>
                )}

                <Button
                  title="Sign Up"
                  onPress={() => navigation.navigate('SignUp')}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  singin: {
    fontSize: 30,
    color: Colors.blue,
    paddingLeft: 5,
    fontWeight: '700',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  signin: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height(10),
    marginHorizontal: 20,
  },
  InputContainer: {
    height: height(90),
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  loader: {
    position: 'absolute',
    top: 350,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default SignInScreen;
