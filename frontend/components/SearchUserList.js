import React from 'react';
import {FlatList, StyleSheet, StatusBar} from 'react-native';
import SearchUser from './SearchUser';

const SearchUserList = ({users}) => {

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <SearchUser
          user={item}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({

});

export default SearchUserList;
