import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigation from './navigation/Navigations';

export default function App() {
  return <Navigation />;
}

// const styles = StyleSheet.create({});

// import React, {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// const App = () => {
//   const [dataSource, setDataSource] = useState([]);

//   useEffect(() => {
//     let items = Array.apply(null, Array(12)).map((v, i) => {
//       return {
//         id: i,
//         src: 'http://placehold.it/200x200?text=' + (i + 1),
//       };
//     });
//     setDataSource(items);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={dataSource}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             style={{
//               flex: 1,
//               flexDirection: 'column',
//               margin: 8,
//             }}>
//             <Image style={styles.imageThumbnail} source={{uri: item.src}} />
//           </TouchableOpacity>
//         )}
//         //Setting the number of column
//         numColumns={4}
//         keyExtractor={(item, index) => index}
//       />
//     </SafeAreaView>
//   );
// };
// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//     backgroundColor: 'white',
//   },
//   imageThumbnail: {
//     justifyContent: 'space-between',
//     alignContent: 'space-between',
//     //alignItems: '',
//     height: 50,
//     width: 70,
//     borderRadius: 25,
//   },
// });

// import React, {useState} from 'react';
// import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

// const App = () => {
//   const [enterGoal, setEnterGoal] = useState('');
//   const goalInputHandler = enteredText => {
//     setEnterGoal(enteredText);
//   };
//   const addGoalHandler = () => {
//     console.log(enterGoal);
//   };

//   return (
//     <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
//       <TextInput
//         style={styles.Input}
//         placeholder="Enter your Goal"
//         onChangeText={goalInputHandler}
//       />
//       <Button title="Add" onPress={addGoalHandler} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   Input: {borderWidth: 2, width: 200},
// });
// export default App;
