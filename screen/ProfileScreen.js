import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../constants';
import {height, width} from 'react-native-dimension';
import {ImageBackground} from 'react-native';
import {images} from '../constants';
import {Icon} from 'react-native-elements';
import InputText4 from '../componets/InputText4';
import InputText from '../componets/InputText3';
import icon from '../constants/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({route, navigation}) => {
  const {email, age, phone} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.Profileheader}>
        <TouchableOpacity onPress={() => navigation.navigate('Match')}>
          <Icon
            name="arrow-left"
            type="material-community"
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 30, color: Colors.white}}>Profile Screen</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Update')}>
          <Icon
            name="update"
            type="material-community"
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
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
      <View
        style={{
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text style={{color: Colors.white, fontSize: 25, fontWeight: 'bold'}}>
          Muhammad Hassan
        </Text>
      </View>
      <View style={{flex: 0.5, paddingLeft: 15, paddingRight: 15}}>
        <View
          style={{
            flex: 0.25,
            // borderTopWidth: 1,
            // borderColor: Colors.white,
            justifyContent: 'flex-end',
          }}>
          <Text style={{color: Colors.white, fontSize: 18}}>Email</Text>
          <Text style={{color: Colors.white, fontSize: 18}}>
            {JSON.stringify(email)}
          </Text>
        </View>
        <View
          style={{
            flex: 0.25,
            borderTopWidth: 1,
            borderColor: Colors.white,
            justifyContent: 'flex-end',
          }}>
          <Text style={{color: Colors.white, fontSize: 18}}>Date-of-Birth</Text>
          <Text style={{color: Colors.white, fontSize: 18}}>
            {JSON.stringify(age)}
          </Text>
        </View>
        <View
          style={{
            flex: 0.25,
            borderTopWidth: 1,
            borderColor: Colors.white,
            justifyContent: 'flex-end',
          }}>
          <Text style={{color: Colors.white, fontSize: 18}}>Cell phone</Text>
          <Text style={{color: Colors.white, fontSize: 18}}>
            {JSON.stringify(phone)}
          </Text>
        </View>
        <View
          style={{
            flex: 0.25,
            borderTopWidth: 1,
            borderColor: Colors.white,
            justifyContent: 'flex-end',
          }}></View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  Profileheader: {
    flex: 0.1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
});
