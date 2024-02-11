import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import {Divider} from '@rneui/themed';
import {dbURI} from '../App';
import Post from '../components/Post';
import * as ImagePicker from 'react-native-image-picker';


const ProfileScreen = ({route}) => {
  const {personalProfile, publicProfile} = route.params;
  const [profileData, setProfileData] = useState({...null, type: 'PERSONAL'});
  const [currentProfileID, setCurrentProfileID] = useState(personalProfile);
  const [editing, setEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);


  const changeCurrentProfileID = () => {
    setCurrentProfileID(currentProfileID === personalProfile ?
      publicProfile : personalProfile);
  };


  const handleEditPress = () => {
    if (editing) {
      // this code runs when the button is clicked to save profile information

    }
    setEditing(!editing);
  };


  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        console.error('Image picker error:', response.error);
      } else {
        setNewImage(response.uri);
      }
    });
  };


  useEffect(() => {
    // Fetch profile data using the personalProfile route
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          dbURI + `profile/getProfile/${currentProfileID}`);
        if (!response.ok) {
          console.error('Failed to fetch profile data');
          return;
        }

        const data = await response.json();

        // Fetch user posts
        const postsResponse = await fetch(
          dbURI + `posts/getPostsByProfileID/${currentProfileID}`);
        if (!postsResponse.ok) {
          console.error('Failed to fetch posts data');
          return;
        }

        const postsData = await postsResponse.json();

        // Update profileData state with posts
        setProfileData({
          ...data.data,
          posts: postsData.data,
        });
      } catch (error) {
        console.error('Error during profile data fetch:', error);
      }
    };

    fetchProfileData();
  }, [currentProfileID]);

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
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      marginTop: 16,
    },
    label: {
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
      backgroundColor: profileData.type === 'PERSONAL' ? '#344497' : '#cd5c5c',
      marginTop: 10,
      borderRadius: 10,
    },
    buttonText: {
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
      {profileData ? (
        <>
          <View style={styles.row}>
            {/* <Image
              style={styles.image}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            /> */}
            <Pressable style={{color: 'blue'}} onPress={handleImagePicker}>
              <Image
                style={styles.image}
                source={{
                  uri: newImage || 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
            </Pressable>
            {/* <Text style={styles.title}>{profileData?.type}</Text> */}

            <View style={styles.column}>
              {/* <Text style={styles.label}>User: {profileData?.user}</Text> */}

              {editing ? (
                <TextInput
                  style={styles.label}
                  value={profileData?.displayName}
                  placeholder="Name"
                  onChangeText={(text) =>
                    setProfileData({...profileData, displayName: text})
                  }
                />
              ) : (
                <View style={styles.row}>
                  <Text style={styles.label}>{profileData?.displayName}</Text>
                </View>

              )}
              {editing ? (
                <View style={styles.row}>
                  <TextInput
                    style={styles.label}
                    value={profileData?.bio}
                    placeholder="Bio"
                    onChangeText={(text) =>
                      setProfileData({...profileData, bio: text})
                    }
                  />
                </View>
              ) : (
                <View style={styles.row}>
                  <Text style={styles.label}>{profileData?.bio}</Text>
                </View>

              )}
            </View>

          </View>
          <Divider
            style={styles.divider}
            color="#D9D9D9"
            // inset
            // insetType="middle"
            subHeaderStyle={{}}
            width={3}
            orientation="horizontal"
          />


          <FlatList
            data={profileData.posts}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => <Post post={item} />}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleEditPress}>
              <Text style={styles.buttonText}>{editing ? 'Save' : 'Edit'}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={changeCurrentProfileID}>
              <Text style={styles.buttonText}>Change Profile</Text>
            </Pressable>
          </View>
        </>
      ) : null}
    </View>
  );
};

ProfileScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      personalProfile: PropTypes.string,
      publicProfile: PropTypes.string,
    }),
  }).isRequired,
};

export default ProfileScreen;
