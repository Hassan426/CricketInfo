import React, {useState, useContext} from 'react';
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
import Button3 from '../componets/Button3';

import InputText2 from '../componets/InputText2';
import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../App';
import EditContainer from '../componets/EditContainer';
import {Picker} from '@react-native-picker/picker';
import {height, width} from 'react-native-dimension';
import RNPickerSelect from 'react-native-picker-select';
import {ActivityIndicator} from 'react-native';
import {firebase} from '@react-native-firebase/auth';

const MatchScreen = ({navigation}) => {
  const {userId} = useContext(AuthContext);
  const [tossvalue, setTossvalue] = useState('');
  const [optvalue, setOptvalue] = useState('');
  const [isloading, setIsLoading] = useState('');
  // console.log('uid', userId);
  // console.log('ffff', tossvalue);
  // console.log('ffff', optvalue);

  const validationSchema = Yup.object().shape({
    team1: Yup.string().required().min(1).max(20).label('Team1'),
    team2: Yup.string().required().min(1).max(20).label('Team2'),
    // toss: Yup.string().min(1).max(1).required().label('Toss'),
    // optTo: Yup.string().min(3).max(4).required().label('OptTo'),
    overs: Yup.string().min(1).max(2).required().label('Overs'),
  });
  const OnstoreData = values => {
    setIsLoading(true);
    firestore()
      .collection('MatchInfo')
      .doc(userId)
      .set({
        Team1: values.team1,
        Team2: values.team2,
        Toss: tossvalue,
        optTo: optvalue,
        Overs: values.overs,
        TeamInfo: {
          striker: 'player*',
          nonStriker: 'player',
          attackBowler: 'bowler*',
          bowler: 'bowler',
          totalScore: 0,
          strikerScore: 0,
          nonStrikerScore: 0,
          strikerBall: 0,
          four: 0,
          six: 0,
          strikRate: 0,
          ball: 0,
          overs: 0,
          currentRunRate: 0,
          wicket: 0,
          totalBall: 0,
          bowlerEconomyRate: 0,
          ECR: 0,
          bowlerOvers: 0,
          bowlerScore: 0,
          bowlerScore: 0,
          perOverRuns: 0,
        },

        // players: firestore.FieldValue.arrayUnion(tossvalue),
      })

      .then(() => {
        console.log('Teams Added');
        setIsLoading(false);
        navigation.navigate('ScoreCard');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon
            name="arrow-left"
            type="material-community"
            color={Colors.blue}
            size={25}
            style={{padding: 14}}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.input}>
        <Formik
          initialValues={{team1: '', team2: '', overs: ''}}
          onSubmit={values => OnstoreData(values)}
          validationSchema={validationSchema}>
          {({handleChange, handleSubmit, errors}) => (
            <>
              <EditContainer
                childern={'Team1'}
                placeyourtext="Team Name"
                onChangeText={handleChange('team1')}
              />
              <Text style={{color: 'red', paddingRight: 60}}>
                {errors.team1}
              </Text>

              <EditContainer
                childern={'Team2'}
                placeyourtext="Team Name"
                onChangeText={handleChange('team2')}
              />
              <Text style={{color: 'red', paddingRight: 60}}>
                {errors.team2}
              </Text>
              <Text style={styles.text}>Toss won by</Text>
              <View style={styles.pickerText}>
                <RNPickerSelect
                  placeholder={{label: 'Select team', color: Colors.blue}}
                  onValueChange={value => setTossvalue(value)}
                  items={[
                    {label: 'Team1', value: 'Team1'},
                    {label: 'Team2', value: 'Team2'},
                  ]}
                />
              </View>
              <Text style={styles.text}>OptTo</Text>
              <View style={styles.pickerText}>
                <RNPickerSelect
                  placeholder={{label: 'Bowl or Bat', color: Colors.blue}}
                  onValueChange={value => setOptvalue(value)}
                  items={[
                    {label: 'Bat', value: 'Bat'},
                    {label: 'Bowl', value: 'Bowl'},
                  ]}
                />
              </View>
              <EditContainer
                childern={'Overs'}
                placeyourtext="Enter Overs"
                onChangeText={handleChange('overs')}
                keyboardType="number-pad"
              />
              <Text style={{color: 'red', paddingLeft: 60}}>
                {errors.overs}
              </Text>

              <View style={{paddingTop: 20}}>
                {isloading ? (
                  <>
                    <ActivityIndicator
                      color={Colors.white}
                      size={30}
                      style={styles.loader}
                    />
                    <Button3 style={{backgroundColor: 'white'}} />
                  </>
                ) : (
                  <Button
                    style={styles.inputContainers}
                    title="Start Match"
                    onPress={handleSubmit}
                  />
                )}
                {/* <Button
                  title={'start'}
                  style={styles.inputContainers}
                  onPress={() => navigation.navigate('ScoreCard')}
                /> */}
                <Button
                  title={'start'}
                  style={styles.inputContainers}
                  onPress={() => navigation.navigate('ScoreCard')}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  backButtonContainer: {
    flex: 0.1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  inputContainers: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    color: Colors.blue,
    //marginTop: 20,
  },
  input: {
    //flex: 0.9,
    //paddingBottom: 25,
    marginHorizontal: 20,
  },
  pickerText: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.white,
    paddingLeft: 20,
    bottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.white,
    paddingLeft: 20,
    bottom: 5,
  },
  pickerText: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginBottom: 20,
  },
  spinner: {
    paddingTop: 10,
  },
  loader: {
    position: 'absolute',
    top: -70,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
