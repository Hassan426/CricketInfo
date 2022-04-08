import React from 'react';
import {StyleSheet, TextInput, View, Image, Text} from 'react-native';
import {height, width} from 'react-native-dimension';
import {Colors} from '../constants';
import {Icon} from 'react-native-elements';

const EditContainer = ({
  placeyourtext,
  name,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  childern,
  style,
}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '900',
          color: Colors.white,
          paddingLeft: 20,
          bottom: 5,
        }}>
        {childern}
      </Text>
      <View style={styles.input}>
        <Icon
          name={name}
          type="material-community"
          color={Colors.white}
          size={20}
        />

        <TextInput
          style={[styles.textinput, style]}
          placeholder={placeyourtext}
          placeholderTextColor={Colors.blue}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: height(7),
    width: width(90),
    backgroundColor: Colors.white,
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
    color: Colors.blue,
  },
});

export default EditContainer;
