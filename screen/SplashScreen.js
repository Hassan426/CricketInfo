import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {png, Colors} from '../constants';
import {width, height, totalSize} from 'react-native-dimension';
import Button from '../componets/Button';

export default function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={png.logo} />
      </View>
      <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={() => navigation.navigate('SignIn')}>
        <Button title="Get Started" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height(20),
    width: width(65),
  },

  ButtonContainer: {
    top: 190,
  },
});
