import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../constants';
import icon from '../constants/icon';

const ActionButton = ({firstIcon, secondIcon, children, onpress}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{
        flex: 0.15,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 0.15,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Icon
          type="material-community"
          name={firstIcon}
          size={20}
          color={Colors.Black}
        />
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',
          //alignItems: 'center',
          left: 50,
        }}>
        <Text style={{fontSize: 17, right: 20}}>{children}</Text>
      </View>
      <View
        style={{
          flex: 0.15,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Icon
          type="material-community"
          name={secondIcon}
          size={20}
          color={Colors.Black}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({});
