import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../constants';

export default function Button1({title, type}) {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: width(20),
          height: height(7),
          backgroundColor: Colors.white,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name={type}
          type="material-community"
          color={Colors.blue}
          size={18}
          style={{padding: 5}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
