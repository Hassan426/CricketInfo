import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  ScrollViewBase,
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
import Modal from 'react-native-modal';
import InputContainer from '../componets/InputContainers';
import {AuthContext} from '../App';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function ScoreCardScreen({navigation}) {
  // useEffect(() => {
  //   getParams();
  // }, []);
  const pickerRef = React.useRef(null);

  const {userId} = useContext(AuthContext);
  const [striker, setStriker] = useState();
  const [nonStriker, setNonStriker] = useState();
  const [attackBolwer, setAttackBowler] = useState();
  const [bowler, setBowler] = useState();
  const [isStrikerModal, setIsStrikerModal] = useState(false);
  const [isNonStrikerModal, setIsNonStrikerModal] = useState(false);
  const [isattackerBowler, setIsattackerBowler] = useState(false);
  const [isNonattackerBowler, setIsNonattackerBowler] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState();

  // const [strikerScore, setStrikerScore] = useState(0);

  useEffect(() => {
    const subscriber = firestore()
      .collection('MatchInfo')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setData(documentSnapshot.data());
        // console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const toggleStrikerBatsmanModal = () => {
    setIsStrikerModal(!isStrikerModal);
  };
  const toggleNonStrikerBatsmanModal = () => {
    setIsNonStrikerModal(!isNonStrikerModal);
  };
  const toggleAttackerBowlerModal = () => {
    setIsattackerBowler(!isattackerBowler);
  };
  const toggleNonAttackerBowlerModal = () => {
    setIsNonattackerBowler(!isNonattackerBowler);
  };
  const onStoreData = params => {
    // console.log('*****************************', params);

    try {
      firestore()
        .collection('MatchInfo')
        .doc(userId)
        .update({
          TeamInfo: params,
        })

        .then(() => {
          console.log('User updated');
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (error) {
      console.log('Pkr liya:', error);
    }
  };

  const onStorePlayers = () => {
    setIsStrikerModal(false);
    setIsNonStrikerModal(false);
    setIsattackerBowler(false);
    setIsNonattackerBowler(false);
    firestore()
      .collection('MatchInfo')
      .doc(userId)
      .set(
        {
          // console.log('*****************************', strikerScore);
          // console.log('********', firestore().collection('MatchInfo').doc(userId));
          TeamInfo: {
            striker: striker || 'player*',
            nonStriker: nonStriker || 'player',
            attackBowler: attackBolwer || 'bowler*',
            bowler: bowler || 'bowler',
          },
        },
        {merge: true},
      );
  };
  const onStoreWicket = wicket => {
    console.log('REf:', pickerRef.current);
    console.log('wicket', wicket);
    firestore()
      .collection('MatchInfo')
      .doc(userId)
      .set(
        {
          TeamInfo: {
            wicket: data.TeamInfo.wicket + 1,
          },
        },
        {merge: true},
      )
      .then(() => {
        console.log('wicket added');
      });
  };

  // const getParams = () => {};

  const postScore = score => {
    const params = {
      ...data.TeamInfo,
      //Batsman Info
      strikerScore: data.TeamInfo.strikerScore + score,
      strikerBall: data.TeamInfo.strikerBall + 1,
      strikRate:
        ((data.TeamInfo.strikerScore + score) /
          (data.TeamInfo.strikerBall + 1)) *
        100,

      //MatchInfo
      totalBall: data.TeamInfo.totalBall + 1,
      totalScore: data.TeamInfo.totalScore + score,
      currentRunRate:
        (data.TeamInfo.totalScore + score * 6) /
        (data.TeamInfo.strikerBall + 1),
      //Bowling Info
      ECR: (data.TeamInfo.totalScore + score) / (data.TeamInfo.overs + 1),
      bowlerScore: data.TeamInfo.bowlerScore + score,
      perOverRuns: data.TeamInfo.strikerBall + score,
    };
    if (score == 4) params.four = data.TeamInfo.four + 1;
    //Batsman Info
    if (score == 6) params.six = data.TeamInfo.six + 1;
    if (data.TeamInfo.strikerBall + 1) params.ball = data.TeamInfo.ball + 1;
    //Match INfo
    if (data.TeamInfo.ball + 1 == 6) params.overs = data.TeamInfo.overs + 1;
    // if(data.TeamInfo.parOverRuns)
    if (data.TeamInfo.ball + 1 == 6) params.ball = data.TeamInfo.ball * 0;
    // Bowling
    if (data.TeamInfo.ball + 1 == 6)
      params.bowlerOvers = data.TeamInfo.bowlerOvers + 1;
    if (data.TeamInfo.perOverRuns == 0)
      params.maidenOvers = data.TeamInfo.maidenOvers + 1;
    if (data.TeamInfo.ball + 1 == 6)
      params.perOverRuns = data.TeamInfo.perOverRuns * 0;
    // console.log('------------------', params);
    onStoreData(params);
  };

  // const bowlerInfo = () => {
  //   const params = {};
  //   if (data.TeamInfo.strikerBall + 1) params.ball = data.TeamInfo.ball + 1;
  //   if (data.TeamInfo.ball + 1 == 6) params.overs = data.TeamInfo.overs + 1;
  //   if (data.TeamInfo.ball + 1 == 6) params.ball = data.TeamInfo.ball * 0;
  // };
  console.log('dataaaaaaaaaaas', data);
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
        <InputText3>{data?.Team2} require 159 in 90 balls</InputText3>
      </View>
      <View
        style={{
          height: height(10.3),
        }}>
        <InputText4>
          {data?.Team1} {data?.TeamInfo.totalScore || '0'}/
          {data?.TeamInfo.wicket || '0'}
        </InputText4>
        <View style={styles.CRR}>
          <InputText3 numberOfLines={1}>
            CRR:{data?.TeamInfo.currentRunRate.toFixed(2) || '0.0'}
          </InputText3>
          <InputText3>
            {data?.TeamInfo.overs || '0'}.{data?.TeamInfo.ball || '0'}/
            {data?.Overs} Overs
          </InputText3>
        </View>
        {/* <InputText3>MSL 115/3</InputText3> */}
      </View>
      <View style={styles.Target}>
        <InputText3>Extras 20(5LB,2NB,1LB,8,4WD)</InputText3>
        <InputText4>Target 156/5</InputText4>
      </View>
      <View style={styles.Ball}>
        <RunsView>w</RunsView>
        <RunsView>2</RunsView>
        <RunsView>2</RunsView>
        <RunsView>4</RunsView>
        <RunsView>0</RunsView>
        <RunsView>6</RunsView>
      </View>
      <View style={{height: height(4), paddingTop: 5}}>
        <InputText3>Extras 20(5LB,2NB,1LB,8,4WD)</InputText3>
      </View>
      <View
        style={{
          height: height(25),
        }}>
        <View style={styles.Batman}>
          <View style={styles.battingContainer}>
            <Text style={styles.player}>BATSMAN</Text>
            <TouchableOpacity onPress={toggleStrikerBatsmanModal}>
              <Text style={{color: '#FFFF00'}} numberOfLines={1}>
                {data?.TeamInfo.striker || 'player*'}
              </Text>
            </TouchableOpacity>
            <Modal isVisible={isStrikerModal}>
              <View style={styles.Modal}>
                <Text style={styles.currentPlayer}>Current name</Text>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: Colors.blue}}>player1*</Text>
                </View>
                <Text style={styles.newPlayer}>New name</Text>
                <InputContainer
                  onChangeText={text => setStriker(text)}
                  value={striker}
                />
                <View style={styles.buttonModal}>
                  <TouchableOpacity style={{width: 120}}>
                    <Button
                      title="Cancle"
                      onPress={toggleStrikerBatsmanModal}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{width: 120}}>
                    <Button title="Save" onPress={onStorePlayers} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={toggleNonStrikerBatsmanModal}>
              <Text style={styles.player} numberOfLines={1}>
                {data?.TeamInfo.nonStriker || 'player'}
              </Text>
            </TouchableOpacity>
            <Modal isVisible={isNonStrikerModal}>
              <View style={styles.Modal}>
                <Text style={styles.currentPlayer}>Current name</Text>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.blue,
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    player2
                  </Text>
                </View>
                <Text style={styles.newPlayer}>New name</Text>
                <InputContainer
                  title={'Enter new name'}
                  onChangeText={text => setNonStriker(text)}
                  value={nonStriker}
                />
                <View style={styles.buttonModal}>
                  <TouchableOpacity style={{width: 120}}>
                    <Button
                      title="Cancle"
                      onPress={toggleNonStrikerBatsmanModal}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{width: 120}}>
                    <Button title="Save" onPress={onStorePlayers} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.Result}>
            <InputText>R</InputText>
            <InputText>{data?.TeamInfo.strikerScore || '0'}</InputText>
            <InputText>0</InputText>
          </View>
          <View style={styles.Result}>
            <InputText>B</InputText>
            <InputText>{data?.TeamInfo.strikerBall || '0'}</InputText>
            <InputText>0</InputText>
          </View>
          <View style={styles.Result}>
            <InputText>4</InputText>
            <InputText>{data?.TeamInfo.four || '0'}</InputText>
            <InputText>0</InputText>
          </View>
          <View style={styles.Result}>
            <InputText>6</InputText>
            <InputText>{data?.TeamInfo.six || '0'}</InputText>
            <InputText>0</InputText>
          </View>
          <View style={styles.Result}>
            <InputText>SR</InputText>
            <InputText>{data?.TeamInfo.strikRate.toFixed(2) || '0'}</InputText>
            <InputText>0.00</InputText>
          </View>
        </View>
        <View style={styles.Bowler}>
          <View style={styles.bowlingContainer}>
            <InputText style={{color: '#FFFF00'}}>BOWLING</InputText>
            <TouchableOpacity onPress={toggleAttackerBowlerModal}>
              <Text style={styles.player}>
                {data?.TeamInfo.attackBowler || 'bowler'}
              </Text>
            </TouchableOpacity>
            <Modal isVisible={isattackerBowler}>
              <View style={styles.Modal}>
                <Text style={styles.currentPlayer}>Current Bowler</Text>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: Colors.blue}}>player3</Text>
                </View>
                <Text style={styles.newPlayer}>New Bowler</Text>
                <InputContainer
                  onChangeText={text => setAttackBowler(text)}
                  value={attackBolwer}
                />
                <View style={styles.buttonModal}>
                  <TouchableOpacity style={{width: 120}}>
                    <Button
                      title="Cancle"
                      onPress={toggleAttackerBowlerModal}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{width: 120}}>
                    <Button title="Save" onPress={onStorePlayers} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={toggleNonAttackerBowlerModal}>
              <Text style={styles.player}>
                {data?.TeamInfo.bowler || 'bowler'}
              </Text>
            </TouchableOpacity>
            <Modal isVisible={isNonattackerBowler}>
              <View style={styles.Modal}>
                <Text style={styles.currentPlayer}>Current Bowler</Text>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: Colors.blue}}>player4</Text>
                </View>
                <Text style={styles.newPlayer}>New Bowler</Text>
                <InputContainer
                  onChangeText={text => setBowler(text)}
                  value={bowler}
                />
                <View style={styles.buttonModal}>
                  <TouchableOpacity style={{width: 120}}>
                    <Button
                      title="Cancle"
                      onPress={toggleNonAttackerBowlerModal}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{width: 120}}>
                    <Button title="Save" onPress={onStorePlayers} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.Result}>
            <InputText>O</InputText>
            <InputText>
              {data?.TeamInfo.bowlerOvers || '0'}.{data?.TeamInfo.ball || '0'}
            </InputText>
            <InputText>0</InputText>
          </View>
          <View style={styles.Result}>
            <InputText>R</InputText>
            <InputText>{data?.TeamInfo.bowlerScore || '0'}</InputText>
            <InputText>0</InputText>
          </View>
          <View style={styles.Result}>
            <InputText>W</InputText>

            <InputText>{data?.TeamInfo.wicket || '0'}</InputText>
            <InputText>0</InputText>
          </View>
          <View style={styles.Result}>
            <InputText>M</InputText>
            <InputText>0</InputText>
            <InputText>0</InputText>
          </View>
          <View style={styles.Result}>
            <InputText>ECR</InputText>
            <InputText>{data?.TeamInfo.ECR.toFixed(2) || '0'}</InputText>
            <InputText>0.00</InputText>
          </View>
        </View>
      </View>
      <View
        style={{
          height: height(25),
          justifyContent: 'space-between',
        }}>
        <View style={styles.buttons}>
          <Button2 title="0" onPress={() => postScore(0)} />
          <Button2 title="1" onPress={() => postScore(1)} />
          <Button2 title="2" onPress={() => postScore(2)} />
          <Button1 type="lock" />
        </View>
        <View style={styles.buttons}>
          <Button2 title="3" onPress={() => postScore(3)} />
          <Button2 title="4" onPress={() => postScore(4)} />
          <Button2 title="6" onPress={() => postScore(6)} />
          <Button1 type="lock" />
        </View>
        <View style={styles.buttons}>
          <View style={styles.pickerText}>
            <RNPickerSelect
              // ref={pickerRef}

              placeholder={{
                label: 'Wicket',
                color: Colors.green,
              }}
              // value={'wicket'}
              onValueChange={value => onStoreWicket(value)}
              items={[
                {label: 'Bowled', value: 'bowled'},
                {label: 'Caught', value: 'caught'},
                {label: 'Stumpt', value: 'stump'},
                {label: 'RunOut(striker)', value: 'runOut(striker)'},
                {label: 'RunOut(nonStriker)', value: 'RunOut(nonStriker)'},
                {label: 'LBW', value: 'LBW'},
                {label: 'Hit-Wicket', value: 'hit-Wicket'},
              ]}
            />
          </View>

          <Button2 title="N-B" />
          {/* <Button2 title="L-B" /> */}
          <Button1 type="lock" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
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
    // backgroundColor: 'red',
  },
  buttons: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  player: {
    fontSize: 18,
    color: Colors.blue,
    fontWeight: 'bold',
  },
  newPlayer: {
    fontSize: 16,
    color: Colors.blue,
    fontWeight: '500',
    paddingBottom: 10,
  },
  currentPlayer: {
    fontSize: 16,
    color: Colors.blue,
    fontWeight: '500',
  },
  player: {
    color: '#FFFF00',
    fontSize: 14,
  },
  Modal: {
    backgroundColor: Colors.white,
    marginHorizontal: 5,
    padding: 10,
  },
  buttonModal: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  spinner: {
    alignContent: 'center',
    alignItems: 'center',
  },
  bowlingContainer: {
    flex: 0.3,
  },
  Result: {
    flex: 0.15,
  },
  battingContainer: {
    flex: 0.3,
  },
  pickerText: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.green,
    width: width(44),
    height: height(7),
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
});
