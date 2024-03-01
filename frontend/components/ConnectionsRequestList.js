import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, ScrollView} from 'react-native';
import ConnectionsRequest from './ConnectionRequest';
import {useGlobalContext, dbURI, UI_COLOR} from '../GlobalContext';

const ConnectionsRequestList = ({users}) => {
  // const [data, setData] = useState('');
  const {
    currentProfileID,
  } = useGlobalContext();

  const handleAccept = async (responseId) => {
    // handlefollow/{response}/{reqID}/{profileID} request id??
    try {
      const response = await fetch(dbURI + `requests/handlerequest/1/${responseId}/${currentProfileID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
        }),
      });

      if (!response.ok) {
        console.error('Failed to handle accept');
      }
      // const newData = await response.json();
      // setData(newData); 

    } catch (error) {
      console.log('error message for accept request: ', error);
    }
  };

  const handleDelete = async(responseId) => {
    
    try {
      const response = await fetch(dbURI + `requests/handlerequest/0/${responseId}/${currentProfileID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
        }),
      });

      if (!response.ok) {
        console.error('Failed to handle delete');
      }

    } catch (error) {
      console.log('error message for delete request: ', error);
    }
  };

  return (
      <FlatList
        data={users}
        keyExtractor={(item) => item.sender._id}
        renderItem={({item}) => (
          <ConnectionsRequest
            user={item}
            onAccept={() => handleAccept(item.requestId)}
            onDelete={() => handleDelete(item.requestId)}
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
