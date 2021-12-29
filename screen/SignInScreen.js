import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
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
import InputText from '../componets/InputText';
import auth from '@react-native-firebase/auth';

import {firebase} from '@react-native-firebase/firestore';
const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate('Match');
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const onSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
        navigation.navigate('Profile');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground style={styles.image} source={images.Group1}>
        <View style={styles.signin}>
          <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
            <Icon
              name="arrow-left"
              type="material-community"
              color={Colors.white}
              size={25}
              style={{padding: 15, paddingRight: 5}}
            />
          </TouchableOpacity>
          <Text style={styles.singin}>Sign in</Text>
        </View>
        <KeyboardAvoidingView style={styles.InputContainer}>
          <InputContainer
            placeyourtext="Enter your email"
            name="email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <InputContainer
            placeyourtext="Enter your password"
            name="lock"
            onChangeText={text => setPassword(text)}
            value={password}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={onSignIn}>
            <Button title="Sign In" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <InputText>Don't have an account?Sign Up</InputText>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width(100),
    height: height(97),
  },
  singin: {
    fontSize: 30,
    color: Colors.white,
    paddingTop: 7,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  signin: {
    flex: 0.6,
    flexDirection: 'row',
  },
  InputContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
export default SignInScreen;
