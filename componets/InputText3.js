import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function InputText2({children, style, numberOfLines}) {
  return (
    <View>
      <Text style={[styles.text, style]} numberOfLines={numberOfLines}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 17,
  },
});
