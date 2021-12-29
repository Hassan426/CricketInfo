import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../constants';
import {Icon} from 'react-native-elements';
import {height, width} from 'react-native-dimension';
import InputText3 from '../componets/InputText3';
import InputText4 from '../componets/InputText4';
import InputText from '../componets/InputText';
import RunsView from '../componets/RunsViews';
import Button1 from '../componets/Button1';
import Button2 from '../componets/Button2';

export default function ScoreCardScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Match')}>
          <Icon
            name="arrow-left"
            type="material-community"
            color={Colors.white}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.requireRuns}>
        <InputText3>MSL require 159 in 90 balls</InputText3>
      </View>
      <View
        style={{
          height: height(10.3),
        }}>
        <InputText4>MSL 115/3</InputText4>
        <View style={styles.CRR}>
          <InputText3>CRR:12.06</InputText3>
          <InputText3>CRR:4.5/8 Overs</InputText3>
        </View>
        <InputText3>MSL 115/3</InputText3>
      </View>
      <View style={styles.Target}>
        <InputText3>Extras 20(5LB,2NB,1LB,8,4WD)</InputText3>
        <InputText4>Target 156/5</InputText4>
      </View>
      <View style={styles.Ball}>
        <RunsView style={{backgroundColor: Colors.green}}>w</RunsView>
        <RunsView style={{backgroundColor: Colors.secondary}}>2</RunsView>
        <RunsView style={{backgroundColor: Colors.secondary}}>2</RunsView>
        <RunsView style={{backgroundColor: Colors.green}}>4</RunsView>
        <RunsView style={{backgroundColor: Colors.secondary}}>0</RunsView>
        <RunsView style={{backgroundColor: Colors.green}}>6</RunsView>
      </View>
      <View style={{height: height(4), paddingTop: 5}}>
        <InputText3>Extras 20(5LB,2NB,1LB,8,4WD)</InputText3>
      </View>
      <View
        style={{
          height: height(25),
        }}>
        <View style={styles.Batman}>
          <View>
            <InputText style={{color: '#FFFF00'}}>BATSMAN</InputText>
            <InputText style={{color: '#FFFF00'}}>Player 1*</InputText>
            <InputText style={{color: '#FFFF00'}}>Player 2</InputText>
          </View>
          <View>
            <InputText>R</InputText>
            <InputText>12</InputText>
            <InputText>266</InputText>
          </View>
          <View>
            <InputText>B</InputText>
            <InputText>45</InputText>
            <InputText>300</InputText>
          </View>
          <View>
            <InputText>4</InputText>
            <InputText>10</InputText>
            <InputText>15</InputText>
          </View>
          <View>
            <InputText>SR</InputText>
            <InputText>100.1</InputText>
            <InputText>150.5</InputText>
          </View>
        </View>
        <View style={styles.Bowler}>
          <View>
            <InputText style={{color: '#FFFF00'}}>BOWLIN G </InputText>
            <InputText style={{color: '#FFFF00'}}>Bowler 1*</InputText>
            <InputText style={{color: '#FFFF00'}}>Bowler 2</InputText>
          </View>
          <View>
            <InputText>O</InputText>
            <InputText>12</InputText>
            <InputText>266</InputText>
          </View>
          <View>
            <InputText>R</InputText>
            <InputText>45</InputText>
            <InputText>300</InputText>
          </View>
          <View>
            <InputText>W</InputText>
            <InputText>10</InputText>
            <InputText>15</InputText>
          </View>
          <View>
            <InputText>ECR</InputText>
            <InputText>100.1</InputText>
            <InputText>150.2</InputText>
          </View>
        </View>
      </View>
      <View
        style={{
          height: height(25),
          justifyContent: 'space-between',
        }}>
        <View style={styles.buttons}>
          <Button2 title="1" />
          <Button2 title="1" />
          <Button2 title="1" />
          <Button1 type="lock" />
        </View>
        <View style={styles.buttons}>
          <Button2 title="1" />
          <Button2 title="1" />
          <Button2 title="1" />
          <Button1 type="lock" />
        </View>
        <View style={styles.buttons}>
          <Button2 title="Wkt" />
          <Button2 title="N-B" />
          <Button2 title="L-B" />
          <Button1 type="lock" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 15,
  },
  backButton: {
    height: height(4),
    alignItems: 'flex-start',
  },
  requireRuns: {
    height: height(6),
    alignItems: 'center',
    flexDirection: 'row',
  },
  CRR: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Target: {
    height: height(10),
    paddingTop: 10,
  },
  Ball: {
    height: height(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Batman: {
    height: height(12.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Bowler: {
    height: height(12.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
