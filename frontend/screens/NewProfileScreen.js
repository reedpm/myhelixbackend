import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Divider} from '@rneui/themed';
import * as ImagePicker from 'react-native-image-picker';
import {useGlobalContext, dbURI, UI_COLOR} from '../GlobalContext';
import {fonts} from '../styles';
import {customFonts} from '../CustomFonts';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const NewProfileScreen = () => {
  customFonts();
  const {
    currentProfileID,
    setCurrentProfileID,
    currentProfileData,
    setCurrentProfileData,
    userData,
    setUserData,
    UIColor,
    setUIColor,
    setCurrentScreen,
  } = useGlobalContext();
  const [newImage, setNewImage] = useState(null);
  
  const setInitialName = () => {
    if(userData) {
      return "Public Profile #" + (userData.publicProfiles.length + 1);
    }
    else{
      return "Public Profile #1";
    }
  }
  const [displayName, setDisplayName] = useState(null);
  const [bio, setBio] = useState(null);
  const navigation = useNavigation();

  //this is to pass back to the Tab navigator which screen within the Connections Stack is currently focused
  useFocusEffect(() => {
    setCurrentScreen("ProfileScreen");
  });



  const createNewProfile = async () => {
    const response = await fetch(dbURI + `user/addPublicProfile/${userData.email}`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayName: displayName,
        profileImage: newImage,
        bio: bio,
      }),
    });

    if (!response.ok) {
      // Handle unsuccessful signup
      Alert.alert(
          'Create new profile failed',
      );
      return;
    }
    console.log('new profile success');

    const data = await response.json();

    console.log('got data');
    setUserData({...data});
    console.log('set data');

    setCurrentProfileID(data.publicProfiles[data.publicProfiles.length - 1]);
    setUIColor(UI_COLOR['PUBLIC']);
    // Navigate to the Profile screen upon successful signup
    navigation.navigate('Profile');
    console.log('navigated');
  };

  const updateProfile = async () => {
    const response = await fetch(dbURI + 'profile/updateProfile/' +
                    userData.email + '/' + currentProfileID + '',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayName: currentProfileData.displayName,
        profileImage: currentProfileData.profileImage,
        bio: currentProfileData.bio,
      }),
    });

    if (!response.ok) {
      // Handle unsuccessful profile update
      Alert.alert(
          'Profile update failed',
      );
      return;
    }
  };


  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      title: 'Select profile picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true, // Exclude Base64 data
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        console.error('Image picker error:', response.error);
      } else {
        if (response.assets) {
          console.log(response);
          setNewImage(response.assets[0].uri);
          console.log(response.assets[0].uri);
          console.log(response.assets[0].uri.split(';base64,')[0]);
        }
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 16,
      paddingVertical: 16,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      marginTop: 16,
    },
    label: {
      fontFamily: fonts.regular,
      fontSize: 16,
      marginBottom: 8,
      marginRight: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    column: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    buttonContainer: {
      alignItems: 'flex-start',
      marginBottom: 50,
    },
    button: {
      // cd5c5c, 9D7F95
      backgroundColor: UIColor,
      marginTop: 10,
      borderRadius: 10,
    },
    buttonText: {
      fontFamily: fonts.regular,
      color: 'white',
      fontSize: 16,
      margin: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 20,
    },
    divider: {
      width: '100%',
      marginTop: 20,
      marginBottom: 15,
    },
  });

  return (
    <View style={styles.container}>
      {currentProfileData ? (
        <>
          <View style={styles.row}>

            <Pressable onPress={handleImagePicker}>
              <Image
                style={styles.image}
                source={{
                  uri: newImage || ('https://reactnative.dev/img/tiny_logo.png'),
                }}
              />
            </Pressable>


            <View style={styles.column}>


              <TextInput
                style={styles.title}
                value={displayName}
                placeholder="Name"
                onChangeText={setDisplayName}
              />

                <View style={styles.row}>
                  <TextInput
                    style={styles.label}
                    value={bio}
                    placeholder="Type your bio here..."
                    onChangeText={setBio}
                  />
                </View>
            </View>
          </View>
          <Divider
            style={styles.divider}
            color="#D9D9D9"
            subHeaderStyle={{}}
            width={3}
            orientation="horizontal"
          />

          <View style={styles.buttonContainer}>
            {/* <Pressable style={styles.button} onPress={handleEditPress}>
              <Text style={styles.buttonText}>{editing ? 'Save' : 'Edit'}</Text>
            </Pressable> */}
            <TouchableOpacity style={styles.button} onPress={createNewProfile}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};


export default NewProfileScreen;
