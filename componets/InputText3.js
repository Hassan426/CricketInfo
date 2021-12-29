import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function InputText2({children, style}) {
  return (
    <View>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 17,
  },
});
