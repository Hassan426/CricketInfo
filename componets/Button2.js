import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../constants';

export default function Button1({title}) {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: width(20),
          height: height(7),
          backgroundColor: Colors.secondary,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
