// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { dbURI } from './App';
import Post from './Post';

const ProfileScreen = ({ route }) => {
  const { personalProfile, publicProfile } = route.params;
  const [profileData, setProfileData] = useState(null);
  const [currentProfileID, setCurrentProfileID] = useState(personalProfile);

  
  const changeCurrentProfileID = () => {
    currentProfileID == personalProfile ? setCurrentProfileID(publicProfile) : setCurrentProfileID(personalProfile);
  }

  useEffect(() => {
    // Fetch profile data using the personalProfile route
    const fetchProfileData = async () => {
      try {
        const response = await fetch(dbURI + `profile/getProfile/${currentProfileID}`);
        if (!response.ok) {
          console.error('Failed to fetch profile data');
          return;
        }
  
        const data = await response.json();
  
        // Fetch user posts
        const postsResponse = await fetch(dbURI + `posts/getPostsByProfileID/${currentProfileID}`);
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

  return (
    <View style={styles.container}>
        { profileData ? (
            <>
            <Text style={styles.title}>{profileData?.type}</Text>
            <Text style={styles.label}>User: {profileData?.user}</Text>
            <Text style={styles.label}>Display Name: {profileData?.displayName}</Text>
            <Button title="Change profile" onPress={changeCurrentProfileID} />
            <FlatList
                data={profileData.posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Post post={item} />}
            />
            </>
        ) : null
        }
        {/* Add more components to display other profile information as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ProfileScreen;
