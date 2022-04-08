import React, {useState} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {png, Colors, images} from '../constants';
import {width, height, totalSize} from 'react-native-dimension';
import Button from '../componets/Button';

export default function SplashScreen({navigation}) {
  const [state, setState] = useState('Hassan');

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={images.beach1} />

      {/* style={styles.ButtonContainer} */}
      {/* onPress={() => navigation.navigate('SignIn')} */}
      <View style={styles.ButtonContainer}>
        <Button
          title={'Get Started'}
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height(20),
    width: width(65),
  },

  ButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});
