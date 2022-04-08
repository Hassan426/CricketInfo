import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {Colors, images} from '../constants';
import icon from '../constants/icon';
import {height, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import InputContainer from '../componets/InputContainers';
import Button from '../componets/Button';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../App';
import {firebase} from '@react-native-firebase/firestore';
import EditContainer from '../componets/EditContainer';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {NavigationContainer} from '@react-navigation/native';

const UpdateProfileScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  //const [userId, setUserId] = useState(null);

  //  const {userId} = useContext(AuthContext);
  //  console.log('userrrrrrrrrrrrrrrrrr', userId);

  // useEffect(() => {
  //   if (image) {
  //     submitProfile();
  //   }
  // }, [image]);

  useEffect(() => {
    retrieveData();
  }, []);
  // const retrieveData = async () => {
  //   const userId = await AsyncStorage.getItem('UserId');
  //   if (userId) setUserId(userId);
  // };

  const {userId, setUserId} = useContext(AuthContext);
  const [isLoading, setIsloading] = useState();
  console.log('**********', userId);

  const imagePicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('==========', image.path, submitProfile(image.path));
      //setImage(image.path);
    });
  };

  const submitProfile = async path => {
    // console.log('paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', path);
    let filename = path.substring(path.lastIndexOf('/') + 1);
    let reference = storage().ref(userId);
    let task = reference.putFile(path);

    task
      .then(response => {
        retrieveData();
        console.log('Image uploaded to the bucket!');
        console.log('dddddddddddddd', data);
      })
      .catch(e => console.log('uploading image error => ', e));
  };

  const retrieveData = async () => {
    setIsloading(true);
    const url = await storage().ref(userId).getDownloadURL();
    setUrl(url);
    onstoreData();
    // console.log('Download URL path====', url);
    setIsloading(false);
  };

  const onstoreData = () => {
    firestore()
      .collection('AuthData')
      .doc(userId)
      .update({
        url: url,
      })
      .then(() => {
        // deleteProfile(filename);
        console.log('User Update your profile');
      });
  };

  // const deleteUserData = () => {
  //   console.log('UserIDUpdateScreen;', userId);
  //   firestore()
  //     .collection('AuthData')
  //     .doc(userId)
  //     .delete()
  //     .then(response => {
  //       console.log('User account Deleted', response);
  //       setUserId(null);
  //       //deleteUserAccount();
  //       // removeKeyitem();
  //     });
  // };

  // // const deleteUserAccount = () => {
  // //   var user = firebase.auth().userId;
  // //   user
  // //     .delete()
  // //     .then(() => {
  // //       console.log('account deleted');
  // //     })
  // //     .catch(error => {
  // //       console.log('not deleted');
  // //     });
  // // };

  // // const removeKeyitem = () => {
  // //   AsyncStorage.removeItem('UserId');
  // // };

  const updateUserData = () => {
    firestore()
      .collection('AuthData')
      .doc(userId)
      .update({
        Age: age,
        Name: name,
        Phone: phone,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#270cde'}}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.textbutton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.textbutton}>Edit Profile</Text>
        <TouchableOpacity onPress={updateUserData}>
          <Text style={styles.textbutton}>Save</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.3,
          //backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          //marginTop: 30,
        }}>
        {isLoading ? (
          <ActivityIndicator color={Colors.white} size={35} />
        ) : (
          <View style={styles.profile}>
            <Image
              style={{width: width(30), height: height(15), borderRadius: 100}}
              source={{
                uri:
                  url ||
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXk5ueutLersbTn6eqor7Lp6+y2u77h4+TIzM7N0dLR1NbU19mxt7q/xMbZ3N3c3+C6v8HCx8mJwGV6AAAFVUlEQVR4nO2d2XbjIAxAARmMd/v/f3YgSVs7kzY2CCMc3Zc50yffI7GDIgTDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMBcEQIt67NqmabtxEqAh9xdhAiBGO8vKoRy3f83S+b9fAYC6MapS8gknauxUviRAa/63+7E0jdC5vzEGEFZWv+k9JOVSF+sIYNWv4Vs5qkWUmau6kzv87o5NgWEEMG/yc03VF5equjvgd3MsLIywHBR0inPujz4ACLOzBa5RfV1KhwN1HyDoHacyFKEO0vNUYxGKdVgAC1I83MdsFOknKkRE0KPq3AZv0CZO0JFb4W/0EhlCF8SZcp5CG9UI71SWsGJMN7pSnHJ7/IqeUQylpDpFRclRj1qIKgKSoMvT3Cqv0QNSjjoMzSCihdDP3nLLvEDPeII0g1gjhtB1NvSCiNkKPTO9IOIKutVwbqEnoME2pDYmIqwpnsmt9MSEHEI3YHS5nTaARTdUA6klBuAnKbE0xVk2baG1iOoSGKqGUJpC/ObFCygN+kmaoZSEYog9oblTEdpYnFBn3d+GhEbEo4eF+1B0Nt0SjPc3w4FMV5OmK6W0DAbU5f0PPR3DNIOFVGQMdZ/GsKLT01zfMI0gG57IB2Tp9Q0vP1qkGvHpnCMC8n73F4RmbWlm3pLOzPv6q6dUK2BK50+X38VIM1woOkn6AbuJaXaECXU0n7Crf/2Tmeufrl3/hPQDTrkT3FSglaTi+rdNhB5wDemsnL7BvvVFLkmRb+7R2dBfgRlEUgunbz7gBi3eFVpKK8M10Fz9JjvexIaqINqLEpLdzB2UFxe0Vr7PIPSntF92+UOaaMXcCm+JfWFJ/xFp3NSmhIfAEKNYgqBTDN/RKEPw9iA/sOJAIYLBVSNkMVUjhD8zPdwY1VxWHR59dHZD+n3zS1ymHqrAQ38Y/B8Xxr1VlCpLdzXxF6CXPY6qGsqt2qbF8q7al1JDcSWiNmjR9L9Lqqq3ZVek84Ce7Muqgkr1y1hufm4AqLvFyEdhyFtpSGmWtr6I3gNnU09d29hbec/a/f9SeiuuKgagQW+5iKo386VnGzvMxvSPe6h9b+Zhse04uaZYrKn/8qmzg3mUnn0xEPoeR/Xz0tyaZe4PPoKXG5uhdwZ7pm3eVM62qwupLQxadNYFbk/l0u3gr/qhmahb6tvoflRuFU1n2QmykhrGQQbbrSxNUxOUdHOzQWGdrrnpagu0pqtaWDS9L0kzkgkkwDjvXeseoZKWxNYUiPZdQetg3No4e0lz/b5gd6Rj3mR1S/jAvd8DVKbL1ensLEiO4ThmcdTNOX43x/n8vRw9ps/PjeNybpcD4viufSRKndkcdXtegv5QnXawAWI+O4B3lGpPCaPucgTwTjWcEMaAivmIKJl64AguKI9G4t9Q0GNmP6+Y8jmUxrp8GIVKV11JZ22CK1SiVVXA2Xwq0lzaAKxS1hikUCQl6BQ7bEVigvjXp9CqreOB+0sY2EWCUcC80K8tmV50Dd5bb0hTMiGeHksR980WIlgl61LV10GgQilxSrKX+QLjHSbZRnjHIASRcAQlxvMTgkP9lujKCyPpHPVEPlXUub//PVXUHBztRWFKomqe6QIEo+p+p6rhhUzE/FQXIRgRRPRaF8kINUxVWhYd1QYqEtj+3UngmEh6yr0l9Icvc3/3fsJmp5CiQlkqgpYYBSVpaJrm/uojBA2JaepZJiLkET+0BSWpDHnFn6pybiICtocJ77C9IqR+XVEhDBkRi+poHMerLNLfoNlyfMzH+m3f0zhqCPbxVrAU6NTgZxiGYRiGYRiGYRiGYT6Uf/VaUTW8zb4SAAAAAElFTkSuQmCC',
              }}
            />
          </View>
        )}

        <TouchableOpacity
          style={{position: 'absolute', bottom: 62, right: 127}}
          onPress={imagePicker}>
          <Image
            style={styles.plusicon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828921.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.5,
          //backgroundColor: 'red',
          justifyContent: 'space-around',
          alignItems: 'center',
          //marginTop: 100,
        }}>
        <EditContainer
          childern="Your Name"
          name={'account-circle'}
          placeyourtext={'Update Your Name'}
          onChangeText={text => setName(text)}
          value={name}
        />
        <EditContainer
          childern="Date of Birth"
          name="calendar-account-outline"
          placeyourtext="Update Your Brith Date"
          onChangeText={text => setAge(text)}
          value={age}
        />
        <EditContainer
          childern="Cell No."
          name="phone"
          placeyourtext="Update Your Cell No."
          onChangeText={text => setPhone(text)}
          value={phone}
        />
      </View>
    </ScrollView>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 30,
  },
  textbutton: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  plusicon: {
    width: width(4),
    height: height(2),
    tintColor: Colors.white,
  },
  profile: {
    width: width(30),
    height: height(15),
    backgroundColor: 'red',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
