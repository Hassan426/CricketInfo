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
}) => {
  return (
    <View style={styles.input}>
      <Icon
        name={name}
        type="material-community"
        color={Colors.white}
        size={20}
      />

      <TextInput
        style={styles.textinput}
        placeholder={placeyourtext}
        placeholderTextColor={Colors.Gray}
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
    height: height(7),
    width: width(90),
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  textinput: {
    // height: height(7),
    width: width(80),
    borderRadius: 25,
    paddingLeft: 25,
    color: Colors.white1,
  },
});

export default InputContainer;
