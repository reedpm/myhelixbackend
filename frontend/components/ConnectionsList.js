import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Connection from './Connection';

const ConnectionsList = ({users}) => {
  const handleEmailPress = (userId) => {
    console.log('Email Icon pressed for user:', userId);
    // Implement email logic
  };

  const handleFaceTimePress = (userId) => {
    console.log('FaceTime Icon pressed for user:', userId);
    // Implement FaceTime logic
  };

  return (
    <FlatList
      data={users}
      // keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <Connection
          user={item}
          onEmailPress={() => handleEmailPress(item.id)}
          onFaceTimePress={() => handleFaceTimePress(item.id)}
        />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default ConnectionsList;
