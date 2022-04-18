import React from 'react';
import {StyleSheet, TextInput, View, Image, Text} from 'react-native';
import {height, width} from 'react-native-dimension';
import {Colors} from '../constants';
import {Icon} from 'react-native-elements';

const InputContainer = ({
  placeyourtext,
  name,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  style,
}) => {
  return (
    <View style={[styles.input, style]}>
      <Icon
        name={name}
        type="material-community"
        color={Colors.white}
        size={20}
        style={{marginHorizontal: 15}}
      />

      <TextInput
        style={[styles.textinput, style]}
        placeholder={placeyourtext}
        placeholderTextColor={Colors.white}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    //height: height(7),
    // width: width(90),
    width: '100%',
    backgroundColor: Colors.blue,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    // height: height(7),
    width: width(80),
    color: Colors.white,
  },
});

export default InputContainer;
