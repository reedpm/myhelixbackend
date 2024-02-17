// UsersList.js
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ConnectionsRequest from './ConnectionRequest';

const ConnectionsRequestList = ({users}) => {
  const handleAccept = (userId) => {
    console.log('Accept clicked for user:', userId);
    // Implement accept logic
  };

  const handleDelete = (userId) => {
    console.log('Delete clicked for user:', userId);
    // Implement delete logic
  };

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <ConnectionsRequest
          user={item}
          onAccept={() => handleAccept(item.id)}
          onDelete={() => handleDelete(item.id)}
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

export default ConnectionsRequestList;
