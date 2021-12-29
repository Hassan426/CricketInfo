import * as React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../constants';
import {
  SplashScreen,
  SignInScreen,
  SignupScreen,
  MatchScreen,
  ScoreCardScreen,
  ProfileScreen,
  UpdateProfileScreen,
} from '../screen';

const Stack = createNativeStackNavigator();

function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Match"
          component={MatchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScoreCard"
          component={ScoreCardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
          // options={{
          //   backgroundColor: Colors.primary,
          //   headerTintColor: Colors.primary,
          //   headerRight: () => (
          //     <TouchableOpacity>
          //       <Icon
          //         name="plus"
          //         type="material-community"
          //         color={Colors.green}
          //         size={30}
          //       />
          //     </TouchableOpacity>
          //   ),
          // }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigations;
