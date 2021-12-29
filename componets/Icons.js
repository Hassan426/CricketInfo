import React, {Children} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../constants';

export default function Icons({name, style}) {
  return (
    <View>
      <Icon
        type="material-community"
        color={Colors.white}
        name={name}
        size={30}
        style={{style}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
