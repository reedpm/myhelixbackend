import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from 'react-native';
import {useGlobalContext, dbURI} from '../GlobalContext';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../styles';
import ImagePicker from 'react-native-image-picker';
import {customFonts} from '../CustomFonts';

const PrivateSetupScreen = () => {
  customFonts();
  const [newImage, setNewImage] = useState(null);
  const {
    currentProfileID,
    currentProfileData,
    setCurrentProfileData,
    userData,
    UIColor,
  } = useGlobalContext();
  const navigation = useNavigation();

  const saveProfile = async () => {
    console.log(currentProfileID);
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
    navigation.navigate('PublicSetupScreen');
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
          <Text style={styles.title}>Setup your private account</Text>
          <View style={styles.row}>

            <Pressable onPress={handleImagePicker}>
              <Image
                style={styles.image}
                source={{
                  uri: newImage || (currentProfileData.profileImage ?? 'https://reactnative.dev/img/tiny_logo.png'),
                }}
              />
            </Pressable>
            <View style={styles.column}>
              <TextInput
                style={styles.title}
                value={currentProfileData?.displayName}
                placeholder="Name"
                onChangeText={(text) =>
                  setCurrentProfileData(
                      {...currentProfileData, displayName: text},
                  )
                }
              />
              <View style={styles.row}>
                <TextInput
                  style={styles.label}
                  value={currentProfileData?.bio}
                  placeholder="Bio"
                  onChangeText={(text) =>
                    setCurrentProfileData({...currentProfileData, bio: text})
                  }
                />
              </View>
            </View>

          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={saveProfile}>
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
        </>
      ) : null}
    </View>
  );
};


export default PrivateSetupScreen;