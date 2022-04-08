import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Colors, images} from '../constants';
import {height, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements/dist/icons/Icon';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView Style={styles.container}>
      <View style={{flex: 0.4}}>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 20,
          }}>
          <Icon
            name="cog-outline"
            type="material-community"
            color={Colors.Black}
            size={20}
            onPress={() => Alert.alert('Setting')}
          />
          <Icon
            name="bell"
            type="material-community"
            color={Colors.Black}
            size={20}
            onPress={() => Alert.alert('Notification')}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 30,
          }}>
          <Image style={{width: 270, height: 25}} source={images.cricket} />
          <Image style={{width: 90, height: 100}} source={images.player} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              paddingRight: 150,
              color: Colors.Black,
            }}>
            Available Games
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.6,
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <View
          style={{
            width: width(80),
            height: height(40),
          }}>
          <Image
            style={{width: width(80), height: height(40)}}
            source={images.Card1}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Match')}
            style={styles.card}>
            <Text style={{color: Colors.white}}>Play Now</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width(80),
            height: height(40),
            marginTop: 15,
            marginBottom: 20,
          }}>
          <Image
            style={{width: width(80), height: height(40)}}
            source={images.Card}
          />
          <TouchableOpacity
            onPress={() => Alert.alert('Resume game')}
            style={styles.card}>
            <Text style={{color: Colors.white}}>Resume</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  card: {
    width: width(25),
    height: height(4),
    backgroundColor: 'black',
    borderRadius: 100,
    position: 'absolute',
    bottom: 30,
    left: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
