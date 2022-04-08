import React, {useEffect, useState} from 'react';
import Navigation from './navigation/Navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({
  userId: null,
  setUserId: () => null,
});

const App = () => {
  const [userId, setUserId] = useState(null);

  const retrieveData = async () => {
    const userId = await AsyncStorage.getItem('UserId');
    if (userId) setUserId(userId);
  };

  const setDataLocally = userId => {
    if (userId == null || userId == undefined) {
      AsyncStorage.removeItem('UserId');
    } else AsyncStorage.setItem('UserId', userId);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    setDataLocally(userId);
  }, [userId]);

  return (
    <AuthContext.Provider value={{userId, setUserId}}>
      <Navigation />
    </AuthContext.Provider>
  );
};

export default App;
// import React, {useState, useRef} from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import {Picker} from '@react-native-picker/picker';

// const App = () => {
//   const [selectedValue, setSelectedValue] = useState('Java');
//   console.log('value==', selectedValue);

//   return (
//     <View style={styles.container}>
//       <Picker
//         selectedValue={selectedValue}
//         style={{height: 50, width: 200, backgroundColor: 'yellow'}}
//         onValueChange={itemValue => setSelectedValue(itemValue)}>
//         <Picker.Item label="Java" value="java" />
//         <Picker.Item label="JavaScript" value="JavaScript" />
//         <Picker.Item label="C++" value="C++" />
//       </Picker>
//       <Text>{selectedValue}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     alignItems: 'center',
//   },
// });

// export default App;
