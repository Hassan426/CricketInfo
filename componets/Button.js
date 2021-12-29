import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {height, width} from 'react-native-dimension';
import {Colors} from '../constants';

import InputText from './InputText';
export default function Button({image, title, style}) {
  return (
    <View style={styles.card}>
      <InputText style={[styles.title, style]}>{title}</InputText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width(90),
    height: height(7),
    backgroundColor: Colors.green,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
