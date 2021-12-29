import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingViewBase,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors, images} from '../constants';
import icon from '../constants/icon';
import {height, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import InputContainer from '../componets/InputContainers';
import Button from '../componets/Button';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProfileScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [name, setName] = useState('');

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserId');
      UpdateData(value);
      console.log('User Id:', value);
      // if (value !== null) {
      //   // We have data!!
      //   console.log(value);
      // }
    } catch (error) {
      console.log('Error');
    }
  };

  const UpdateData = value => {
    firestore()
      .collection('AuthData')
      .doc(value)
      .update({
        Email: email,
        Age: age,
        Name: name,
        cellPhone: cellPhone,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary}}>
      <View
        style={{
          //flex: 0.1,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon
            name="arrow-left"
            type="material-community"
            size={25}
            color={Colors.white}
            style={{padding: 15}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.Profileheader}>
        <Text style={{fontSize: 30, color: Colors.white}}>
          Update your Profile
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          alignItems: 'center',
        }}>
        <View style={styles.profileContainer}>
          <Image style={styles.profile} source={images.imagess} />
          <TouchableOpacity>
            <Image style={styles.plusicon} source={icon.plus} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.InputContainer}>
        <InputContainer
          placeyourtext="Muhammad Hassan"
          onChangeText={text => setName(text)}
          value={name}
        />
        <InputContainer
          placeyourtext="hassan0501651@gamil.com"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <InputContainer
          placeyourtext="15Dec 1999"
          onChangeText={text => setAge(text)}
          value={age}
        />
        <InputContainer
          placeyourtext="+923200501651"
          onChangeText={text => setCellPhone(text)}
          value={cellPhone}
        />
        <TouchableOpacity onPress={retrieveData}>
          <Button title="Save it" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    width: width(50),
    height: height(25),
    borderRadius: 100,
  },
  profile: {
    width: width(50),
    height: height(25),
    borderRadius: 100,
  },
  plusicon: {
    width: width(10),
    height: height(5),
    borderRadius: 100,
    left: 140,
    bottom: 58,
  },
  Profileheader: {
    flex: 0.1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  InputContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
