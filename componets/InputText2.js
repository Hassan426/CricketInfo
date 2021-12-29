import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function InputText2({children}) {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    paddingLeft: 35,
    paddingBottom: 7,
    paddingTop: 20,
  },
});
