import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants';

export default function InputText2({children}) {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.blue,
    paddingLeft: 35,
    paddingBottom: 7,
    paddingTop: 20,
  },
});
