import React from 'react';
import {FlatList, StyleSheet, ScrollView} from 'react-native';
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
    <ScrollView>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item}) => (
          <ConnectionsRequest
            user={item}
            onAccept={() => handleAccept(item._id)}
            onDelete={() => handleDelete(item._id)}
          />
        )}
        style={styles.list}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default ConnectionsRequestList;
