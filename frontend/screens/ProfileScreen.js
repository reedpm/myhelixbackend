import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
} from 'react-native';
import {Divider} from '@rneui/themed';
import Post from '../components/Post';
import * as ImagePicker from 'react-native-image-picker';
import {useGlobalContext, dbURI, UI_COLOR} from '../GlobalContext';
import {fonts} from '../styles';
import {customFonts} from '../CustomFonts';
import {useFocusEffect} from '@react-navigation/native';
import DeleteConfirm from '../components/DeleteConfirm';

const ProfileScreen = ({route}) => {
  customFonts();
  const [editing, setEditing] = useState(route.params.editing);
  const [newImage, setNewImage] = useState(null);
  const [posts, setPosts] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);

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

  //this is to pass back to the Tab navigator which screen within the Connections Stack is currently focused
  useFocusEffect(() => {
    setCurrentScreen("ProfileScreen");
  });

  const changeCurrentProfileID = () => {
    setCurrentProfileID(
      currentProfileID === userData.personalProfile ?
      userData.publicProfiles[0] : userData.personalProfile,
    );
    setUIColor(UI_COLOR[currentProfileData.type]);
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

  const deleteProfile = async () => {
    const response = await fetch(dbURI + 'profile/deleteProfile/' +
                    userData.email + '/' + currentProfileID + '',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Handle unsuccessful profile delete
      Alert.alert(
          'Profile delete failed',
      );
      return;
    }

    const data = await response.json();
    setUserData({...data});
    setCurrentProfileID(userData.personalProfile);
    setUIColor(UI_COLOR[currentProfileData.type]);
  };

  const handleEditPress = () => {
    if (editing) {
      // this code runs when the button is clicked to save profile information
      updateProfile();
    }
    setEditing(!editing);
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

  // Fetch profile data using the personalProfile route
  const fetchPosts = async () => {
    try {
    // Fetch user posts
      const postsResponse = await fetch(
          dbURI + `posts/getPostsByProfileID/${currentProfileID}`);
      if (!postsResponse.ok) {
        console.error('Failed to fetch posts');
        return;
      }

      const postsData = await postsResponse.json();

      // Update profileData state with posts
      console.log(postsData.data);
      setPosts(postsData.data);
    } catch (error) {
      console.error('Error during posts fetch:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    setEditing(route.params.editing);
  }, [currentProfileID]);

  useFocusEffect(
      React.useCallback(() => {
        fetchPosts();
      }, [currentProfileID]),
  );


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
            {editing ? (
              <Pressable onPress={handleImagePicker}>
                <Image
                  style={styles.image}
                  source={{
                    uri: newImage || (currentProfileData.profileImage ?? 'https://reactnative.dev/img/tiny_logo.png'),
                  }}
                />
              </Pressable>
            ) : (
              <Image
                style={styles.image}
                source={{
                  uri: currentProfileData.profileImage ?? 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
            )}


            <View style={styles.column}>

              {editing ? (
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
              ) : (
                <View style={styles.row}>
                  <Text style={styles.title}>
                    {currentProfileData?.displayName}
                  </Text>
                </View>

              )}
              {editing ? (
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
              ) : (
                <View style={styles.row}>
                  <Text style={styles.label}>{currentProfileData?.bio}</Text>
                </View>

              )}
            </View>

          </View>
          <Divider
            style={styles.divider}
            color="#D9D9D9"
            subHeaderStyle={{}}
            width={3}
            orientation="horizontal"
          />

          <FlatList
            data={posts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Post post={{ ...item, createdBy: currentProfileData.displayName }} />}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleEditPress}>
              <Text style={styles.buttonText}>{editing ? 'Save' : 'Edit'}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={changeCurrentProfileID}>
              <Text style={styles.buttonText}>Change Profile</Text>
            </Pressable>
            {currentProfileID !== userData.personalProfile &&
                <DeleteConfirm buttonText={"Delete \'" + currentProfileData?.displayName + "\'"} handleDelete={deleteProfile} canDelete={userData.publicProfiles.length > 1}/>
              }
          </View>
        </>
      ) : null}
    </View>
  );
};


export default ProfileScreen;
