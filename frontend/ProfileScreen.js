// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { personalProfile, publicProfile } = route.params;
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data using the personalProfile route
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile/getProfile/${personalProfile}`);
        if (!response.ok) {
          console.error('Failed to fetch profile data');
          return;
        }

        const data = await response.json();
        setProfileData(data.data);
      } catch (error) {
        console.error('Error during profile data fetch:', error);
      }
    };

    fetchProfileData();
  }, [personalProfile]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User: {profileData?.user}</Text>
      <Text style={styles.label}>Display Name: {profileData?.displayName}</Text>
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
