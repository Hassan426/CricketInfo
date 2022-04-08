import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants';
import {height, width} from 'react-native-dimension';
import {images} from '../constants';
import {Icon} from 'react-native-elements';
import icon from '../constants/icon';
import ImagePicker from 'react-native-image-crop-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../App';
import ActionButton from '../componets/ActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import ContentLoader from 'react-native-easy-content-loader';

const ProfileScreen = ({route, navigation}) => {
  // // const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsloading] = useState(true);

  const {userId, setUserId} = useContext(AuthContext);

  useEffect(() => {
    retrieveData();
  }, []);
  useEffect(() => {
    {
      retrieveUserInfo();
    }
  }, []);

  const retrieveData = async () => {
    setIsloading(true);
    const url = await storage().ref(userId).getDownloadURL();
    setUrl(url);
    setIsloading(false);
    //console.log('Download URL path====', url);
  };

  const retrieveUserInfo = () => {
    setIsloading(true);
    const userDocument = firestore().collection('AuthData').doc(userId);

    userDocument
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          setData(doc.data());
          setIsloading(false);
        } else {
          // doc.data() will be undefined in this case

          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  };

  const logOutuserAccount = () => {
    setUserId(null);
  };

  const deleteUserAccount = () => {
    // firestore()
    //   .collection('AuthData')
    //   .doc(userId)
    //   .delete()
    //   .then(() => {
    //     setUserId(null);
    //     console.log('User deleted!');
    // //   });
    // firebase
    //   .auth()
    //   .userId.delete()
    //   .then(() => {
    //     // User deleted.
    //   })
    //   .catch(error => {
    //     // An error ocurred
    //     // ...
    //   });
  };

  const exitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <ImageBackground
      style={{width: width(100), height: height(100)}}
      source={images.background}>
      <View style={styles.profileTextcontainer}>
        <Text style={styles.profiletext}>Profile Screen</Text>
      </View>
      <View style={styles.card}>
        {isLoading ? (
          <View style={{paddingTop: 45}}>
            <ActivityIndicator size={35} />
          </View>
        ) : (
          <View style={{paddingTop: 10}}>
            <Image
              style={styles.profileimage}
              source={{
                uri:
                  url ||
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXk5ueutLersbTn6eqor7Lp6+y2u77h4+TIzM7N0dLR1NbU19mxt7q/xMbZ3N3c3+C6v8HCx8mJwGV6AAAFVUlEQVR4nO2d2XbjIAxAARmMd/v/f3YgSVs7kzY2CCMc3Zc50yffI7GDIgTDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMBcEQIt67NqmabtxEqAh9xdhAiBGO8vKoRy3f83S+b9fAYC6MapS8gknauxUviRAa/63+7E0jdC5vzEGEFZWv+k9JOVSF+sIYNWv4Vs5qkWUmau6kzv87o5NgWEEMG/yc03VF5equjvgd3MsLIywHBR0inPujz4ACLOzBa5RfV1KhwN1HyDoHacyFKEO0vNUYxGKdVgAC1I83MdsFOknKkRE0KPq3AZv0CZO0JFb4W/0EhlCF8SZcp5CG9UI71SWsGJMN7pSnHJ7/IqeUQylpDpFRclRj1qIKgKSoMvT3Cqv0QNSjjoMzSCihdDP3nLLvEDPeII0g1gjhtB1NvSCiNkKPTO9IOIKutVwbqEnoME2pDYmIqwpnsmt9MSEHEI3YHS5nTaARTdUA6klBuAnKbE0xVk2baG1iOoSGKqGUJpC/ObFCygN+kmaoZSEYog9oblTEdpYnFBn3d+GhEbEo4eF+1B0Nt0SjPc3w4FMV5OmK6W0DAbU5f0PPR3DNIOFVGQMdZ/GsKLT01zfMI0gG57IB2Tp9Q0vP1qkGvHpnCMC8n73F4RmbWlm3pLOzPv6q6dUK2BK50+X38VIM1woOkn6AbuJaXaECXU0n7Crf/2Tmeufrl3/hPQDTrkT3FSglaTi+rdNhB5wDemsnL7BvvVFLkmRb+7R2dBfgRlEUgunbz7gBi3eFVpKK8M10Fz9JjvexIaqINqLEpLdzB2UFxe0Vr7PIPSntF92+UOaaMXcCm+JfWFJ/xFp3NSmhIfAEKNYgqBTDN/RKEPw9iA/sOJAIYLBVSNkMVUjhD8zPdwY1VxWHR59dHZD+n3zS1ymHqrAQ38Y/B8Xxr1VlCpLdzXxF6CXPY6qGsqt2qbF8q7al1JDcSWiNmjR9L9Lqqq3ZVek84Ce7Muqgkr1y1hufm4AqLvFyEdhyFtpSGmWtr6I3gNnU09d29hbec/a/f9SeiuuKgagQW+5iKo386VnGzvMxvSPe6h9b+Zhse04uaZYrKn/8qmzg3mUnn0xEPoeR/Xz0tyaZe4PPoKXG5uhdwZ7pm3eVM62qwupLQxadNYFbk/l0u3gr/qhmahb6tvoflRuFU1n2QmykhrGQQbbrSxNUxOUdHOzQWGdrrnpagu0pqtaWDS9L0kzkgkkwDjvXeseoZKWxNYUiPZdQetg3No4e0lz/b5gd6Rj3mR1S/jAvd8DVKbL1ensLEiO4ThmcdTNOX43x/n8vRw9ps/PjeNybpcD4viufSRKndkcdXtegv5QnXawAWI+O4B3lGpPCaPucgTwTjWcEMaAivmIKJl64AguKI9G4t9Q0GNmP6+Y8jmUxrp8GIVKV11JZ22CK1SiVVXA2Xwq0lzaAKxS1hikUCQl6BQ7bEVigvjXp9CqreOB+0sY2EWCUcC80K8tmV50Dd5bb0hTMiGeHksR980WIlgl61LV10GgQilxSrKX+QLjHSbZRnjHIASRcAQlxvMTgkP9lujKCyPpHPVEPlXUub//PVXUHBztRWFKomqe6QIEo+p+p6rhhUzE/FQXIRgRRPRaF8kINUxVWhYd1QYqEtj+3UngmEh6yr0l9Icvc3/3fsJmp5CiQlkqgpYYBSVpaJrm/uojBA2JaepZJiLkET+0BSWpDHnFn6pybiICtocJ77C9IqR+XVEhDBkRi+poHMerLNLfoNlyfMzH+m3f0zhqCPbxVrAU6NTgZxiGYRiGYRiGYRiGYT6Uf/VaUTW8zb4SAAAAAElFTkSuQmCC',
              }}
            />
          </View>
        )}

        {isLoading ? (
          <View style={{paddingTop: 55}}>
            <ContentLoader
              active
              // avatar
              pRows={5}
              pWidth={['100%', '75%', '25%', '90%']}></ContentLoader>
          </View>
        ) : (
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>{data.Name}</Text>
            <Text style={styles.infoText}>{data.Email}</Text>
            <Text style={styles.infoText}>{data.Phone}</Text>
            <Text style={styles.infoText}>Age :{data.Age}</Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 0.35,
          alignContent: 'space-between',
          justifyContent: 'space-evenly',
        }}>
        <ActionButton
          firstIcon={'lock'}
          children={'Updatepassword'}
          secondIcon={'chevron-right'}
        />
        <ActionButton
          onpress={() => navigation.navigate('Update')}
          firstIcon={'account-circle'}
          children={'Update your profile'}
          secondIcon={'chevron-right'}
        />

        <ActionButton
          onpress={() =>
            Alert.alert(
              'Delete user account',
              'Delete this account will result in completely remove you account from the system and you would not able to access this app',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: deleteUserAccount},
              ],
            )
          }
          firstIcon={'account-off'}
          children={'Deactivate account'}
          secondIcon={'chevron-right'}
        />

        <ActionButton
          onpress={() =>
            Alert.alert('Log Out', 'Are you sure to logout', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: logOutuserAccount},
            ])
          }
          firstIcon={'logout'}
          children={'Logout'}
          secondIcon={'chevron-right'}
        />
        <ActionButton
          onpress={() =>
            Alert.alert('Exit', 'Are you sure to exit app', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: exitApp},
            ])
          }
          firstIcon={'location-exit'}
          children={'Exit'}
          secondIcon={'chevron-right'}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  card: {
    backgroundColor: 'white',
    flex: 0.4,
    margin: 25,
    borderRadius: 25,
    bottom: 10,
    alignItems: 'center',
    elevation: 8,
    // justifyContent: 'center',

    // shadowColor: Colors.Black,
    // shadowOpacity: 0.25,
    // shadowRadius: 30,
  },
  infoText: {
    fontSize: 16,
    color: Colors.Gray,
  },
  infoTextContainer: {
    justifyContent: 'space-around',
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  profiletext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  profileTextcontainer: {
    flex: 0.1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profileimage: {
    width: width(30),
    height: height(15),
    borderRadius: 100,
  },
});
export default ProfileScreen;
