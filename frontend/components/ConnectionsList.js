import React from 'react';
import {FlatList, StyleSheet, StatusBar} from 'react-native';
import Connection from './Connection';

const ConnectionsList = ({users}) => {
  const handleEmailPress = (userId) => {
    console.log('Email Icon pressed for user:', userId);
    // Implement email logic
  };

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={users}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({item}) => (
        <Connection
          user={item}
          onEmailPress={() => handleEmailPress(item._id)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  scrollView: {
    height: '20%',
    width: '80%',
    margin: 20,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'lightblue'
  },
});

export default ConnectionsList;
