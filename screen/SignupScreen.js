import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
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
import Button3 from '../componets/Button3';
import InputText from '../componets/InputText';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../App';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignupScreen = ({navigation}) => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [age, setAge] = useState('');
  // const [phone, setPhone] = useState('');
  // const [values, setValues] = useState('');

  const {setUserId} = useContext(AuthContext);
  const [isloading, setIsloading] = useState(false);

  const onSingup = async values => {
    setIsloading(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(response => {
        // storeData(response.user.uid);
        // console.log('User account created & signed in!', response.user.uid);
        setUserId(response.user.uid);
        OnstoreData(response.user.uid, values);
        setIsloading(false);
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

  const OnstoreData = (uid, values) => {
    firestore()
      .collection('AuthData')
      .doc(uid)
      .set({
        Name: values.name,
        Password: values.password,
        Email: values.email,
        Age: values.age,
        Phone: values.phone,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  // const storeData = async uid => {
  //   try {
  //     await AsyncStorage.setItem('UserId', uid);
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  // const onSingup = values => {
  //   setValues(values);
  //   authenticateUser();
  //   console.log('ddddddddddddd', values);
  // };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password'),

    name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(30)
      .required(),
    age: Yup.number().required().positive().integer(),
    phone: Yup.string().min(13).max(13).required(),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.signin}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Icon
              name="arrow-left"
              type="material-community"
              color={Colors.blue}
              size={25}
              // style={{padding: 15, paddingRight: 5}}
            />
          </TouchableOpacity>
          <Text style={styles.singin}>Sign up</Text>
        </View>
        <KeyboardAvoidingView style={styles.InputContainer}>
          <Formik
            initialValues={{
              email: '',
              password: '',
              // phone: '',
              // age: new Date(),
            }}
            // onSubmit={values => console.log('ddddddddddd', values)}
            onSubmit={values => onSingup(values)}
            validationSchema={validationSchema}>
            {({handleChange, handleSubmit, errors}) => (
              <>
                <InputContainer
                  placeyourtext="Name"
                  name="account-circle"
                  onChangeText={handleChange('name')}
                />
                <Text style={{color: 'red', paddingRight: 100}}>
                  {errors.name}
                </Text>
                <InputContainer
                  placeyourtext="Enter your email"
                  name="email"
                  onChangeText={handleChange('email')}
                />
                <Text style={{color: 'red', paddingRight: 100}}>
                  {errors.email}
                </Text>
                <InputContainer
                  placeyourtext="Enter your password"
                  name="lock"
                  onChangeText={handleChange('password')}
                  keyboardType="numeric"
                />

                <Text style={{color: 'red', paddingRight: 70}}>
                  {errors.password}
                </Text>
                <InputContainer
                  placeyourtext="Date of Birth"
                  name="human-handsup"
                  onChangeText={handleChange('age')}
                  keyboardType={'number-pad'}
                />
                <Text style={{color: 'red', paddingRight: 100}}>
                  {errors.age}
                </Text>
                <InputContainer
                  placeyourtext="Enter your Phone"
                  name="phone"
                  onChangeText={handleChange('phone')}
                  keyboardType="phone-pad"
                />
                <Text style={{color: 'red', paddingRight: 90}}>
                  {errors.phone}
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
                    <Button title="Sign Up" onPress={handleSubmit} />
                  </>
                )}

                <Button
                  title="Sign In"
                  onPress={() => navigation.navigate('SignIn')}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: width(100),
    height: height(97),
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
export default SignupScreen;
