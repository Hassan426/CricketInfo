import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Loader from 'react-native-easy-content-loader';
import ContentLoader from 'react-native-easy-content-loader';

const RankingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ContentLoader
        active
        // avatar
        pRows={4}
        pWidth={['100%', 200, '25%', 45]}></ContentLoader>
    </View>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({});
