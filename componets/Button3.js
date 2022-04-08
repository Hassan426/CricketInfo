import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {height, width} from 'react-native-dimension';
import {Colors} from '../constants';

import InputText from './InputText';
export default function Button({image, title, style, onPress}) {
  return <View onPress={onPress} style={[styles.card, style]}></View>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: height(7),
    backgroundColor: Colors.blue,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
