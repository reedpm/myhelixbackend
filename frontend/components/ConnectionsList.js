import React from 'react';
import {FlatList, StyleSheet, ScrollView, View} from 'react-native';
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
    <View style={{flex: 1, flexDirection: 'column'}}> 
    <FlatList
      scrollEnabled={true}
      data={users}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({item}) => (
        <Connection
          user={item}
          onEmailPress={() => handleEmailPress(item._id)}
          onFaceTimePress={() => handleFaceTimePress(item._id)}
        />
      )}
    />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ConnectionsList;
