import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import {Colors} from '../constants';
import {COLORS} from '../constants/themes';
import InputText4 from './InputText4';

export default function RunsView({style, children}) {
  return (
    <View>
      <View style={[styles.container, style]}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: Colors.white}}>
          {children}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width(12),
    height: height(6),
    backgroundColor: Colors.green,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
