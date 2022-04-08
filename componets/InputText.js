import React from 'react';
import {StyleSheet, Text, View, style, numberOfLines} from 'react-native';
import {Colors} from '../constants';

export default function InputText({children, style, color, numberOfLines}) {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: Colors.white,
  },
});
