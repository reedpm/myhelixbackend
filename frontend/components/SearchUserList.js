import React from 'react';
import {FlatList, StyleSheet, StatusBar} from 'react-native';
import SearchUser from './SearchUser';

const SearchUserList = ({users, isConnection, isPrivate}) => {
    const handlePress = async() => {
        console.log("handle pressed");
    }

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <SearchUser
          user={item}
          onFollow={() => handlePress(item.requestId)}
          isConnection={isConnection}
          isPrivate={isPrivate}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({

});

export default SearchUserList;
