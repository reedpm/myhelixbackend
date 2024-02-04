// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { dbURI } from './App';

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
        setProfileData(data.data);
        console.log("profile data: ", profileData);
      } catch (error) {
        console.error('Error during profile data fetch:', error);
      }
    };

    fetchProfileData();
  }, [currentProfileID]);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{profileData?.type}</Text>
        <Text style={styles.label}>User: {profileData?.user}</Text>
        <Text style={styles.label}>Display Name: {profileData?.displayName}</Text>
        <Button title="Change profile" onPress={changeCurrentProfileID} />
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
