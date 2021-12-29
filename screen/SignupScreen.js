import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const authenticateUser = async => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        storeData(response.user.uid);
        console.log('User account created & signed in!', response.user.uid);
        OnstoreData(response.user.uid);

        navigation.navigate('Profile', {
          email: email,
          age: age,
          phone: phone,
        });
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

  const OnstoreData = uid => {
    firestore()
      .collection('AuthData')
      .doc(uid)
      .set({
        Name: name,
        Password: password,
        Email: email,
        Age: age,
        Phone: phone,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  const storeData = async uid => {
    try {
      await AsyncStorage.setItem('UserId', uid);
      await AsyncStorage.setItem('email', email);
    } catch (error) {
      // Error saving data
    }
  };

  const onSingup = () => {
    // console.log(name, email, password);
    authenticateUser();
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground style={styles.image} source={images.Group1}>
        <View style={styles.signin}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Icon
              name="arrow-left"
              type="material-community"
              color={Colors.white}
              size={25}
              style={{padding: 15, paddingRight: 5}}
            />
          </TouchableOpacity>
          <Text style={styles.singin}>Sign up</Text>
        </View>
        <KeyboardAvoidingView style={styles.InputContainer}>
          <InputContainer
            placeyourtext="Name"
            name="account-circle"
            onChangeText={text => setName(text)}
            value={name}
          />
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
            secureTextEntry={true}
            keyboardType="numeric"
          />
          <InputContainer
            placeyourtext="Date of birth 15Dec 2010"
            name="human-handsup"
            onChangeText={text => setAge(text)}
            value={age}
            //keyboardType="numeric"
          />
          <InputContainer
            placeyourtext="Enter your Phone"
            name="phone"
            onChangeText={text => setPhone(text)}
            value={phone}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={onSingup}>
            <Button title="Sign Up" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <InputText>Don't have an account?Sign In</InputText>
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
    flex: 0.35,
    flexDirection: 'row',
  },
  InputContainer: {
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
export default SignupScreen;
