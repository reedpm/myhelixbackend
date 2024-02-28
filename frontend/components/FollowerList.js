import React from 'react';
import {FlatList, StyleSheet, StatusBar} from 'react-native';
import Follower from './Follower';

const FollowerList = ({users}) => {

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <Follower
          user={item}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({

});

export default FollowerList;
