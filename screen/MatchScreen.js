import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../constants';
import {Icon} from 'react-native-elements';
import InputContainers from '../componets/InputContainers';
import Button from '../componets/Button';
import InputText2 from '../componets/InputText2';
import firestore from '@react-native-firebase/firestore';

export default function MatchScreen({navigation}) {
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [toss, setToss] = useState();
  const [optTo, setoptTo] = useState();
  const [overs, setOvers] = useState();

  const onStartMatch = () => {
    firestore()
      .collection('AuthData')
      .doc('ss')
      .set({
        Team1: team1,
        Team2: team2,
        Toss: toss,
        OptTo: optTo,
        Overs: overs,
      })
      .then(() => {
        console.log('User added!');
      });
  };
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Icon
            name="arrow-left"
            type="material-community"
            color={Colors.white}
            size={25}
            style={{padding: 14}}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.input}>
        <InputText2>Team 1</InputText2>
        <View style={styles.inputContainers}>
          <InputContainers
            placeyourtext="Team Name"
            onChangeText={text => setTeam1(text)}
            value={team1}
          />
        </View>
        <InputText2>Team 2</InputText2>
        <View style={styles.inputContainers}>
          <InputContainers
            placeyourtext="Team Name"
            onChangeText={text => setTeam2(text)}
            value={team2}
          />
        </View>
        <InputText2>Toss Won by </InputText2>
        <View style={styles.inputContainers}>
          <InputContainers
            placeyourtext="Team 1  or  Team 2"
            onChangeText={text => setToss(text)}
            value={toss}
          />
        </View>
        <InputText2>Opt to ?</InputText2>
        <View style={styles.inputContainers}>
          <InputContainers
            placeyourtext="Bat or Bow"
            onChangeText={text => setoptTo(text)}
            value={optTo}
          />
        </View>
        <InputText2>Overs</InputText2>
        <View style={styles.inputContainers}>
          <InputContainers
            placeyourtext="Enter Overs"
            onChangeText={text => setOvers(text)}
            value={overs}
          />
        </View>
        <InputText2></InputText2>
        <TouchableOpacity
          style={styles.inputContainers}
          onPress={() => navigation.navigate('Profile')}>
          <Button title="Start Match" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backButtonContainer: {
    flex: 0.1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  inputContainers: {alignItems: 'center'},
  input: {
    flex: 0.9,
    alignContent: 'space-between',
    paddingBottom: 25,
  },
});
