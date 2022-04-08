import React, {useState, useEffect, useContext} from 'react';
import {BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../App';
import {Colors} from '../constants';

import {
  SplashScreen,
  SignInScreen,
  SignupScreen,
  MatchScreen,
  ScoreCardScreen,
  ProfileScreen,
  UpdateProfileScreen,
  HomeScreen,
  HistoryScreen,
  RankingScreen,
} from '../screen';
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              type="material-community"
              name="home"
              size={20}
              color={Colors.Black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              type="material-community"
              name="account-circle"
              size={25}
              color={Colors.Black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              type="material-community"
              name="update"
              size={25}
              color={Colors.Black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              type="material-community"
              name="update"
              size={25}
              color={Colors.Black}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Homes"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Match"
        component={MatchScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="ScoreCard"
        component={ScoreCardScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Update"
        component={UpdateProfileScreen}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

const Navigations = () => {
  // const [userId, setUserId] = useState(null);
  // useEffect(() => {
  //   retrieveData();
  // }, []);

  const {userId, setUserId} = useContext(AuthContext);
  console.log('============== User ID:', userId);

  // const retrieveData = async () => {
  //   const userId = await AsyncStorage.getItem('UserId');
  //   if (userId) setUserId(userId);
  //   console.log('id', userId);
  // };

  return (
    <NavigationContainer>
      {userId ? MainStackNavigator() : AuthStackNavigator()}
    </NavigationContainer>
  );
};

export default Navigations;
