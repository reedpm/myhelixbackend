import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ConnectionsRequest from './ConnectionRequest';
import {useGlobalContext, dbURI} from '../GlobalContext';
import PropTypes from 'prop-types';


const ConnectionsRequestList = ({users}) => {
  const {
    currentProfileID,
  } = useGlobalContext();

  const handleAccept = async (responseId) => {
    try {
      const response = await fetch(
          dbURI + `requests/handlerequest/1/${responseId}/${currentProfileID}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            }),
          },
      );

      if (!response.ok) {
        console.error('Failed to handle accept');
      }
    } catch (error) {
      console.log('error message for accept request: ', error);
    }
  };

  const handleDelete = async (responseId) => {
    try {
      const response = await fetch(
          dbURI + `requests/handlerequest/0/${responseId}/${currentProfileID}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            }),
          },
      );

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

ConnectionsRequestList.propTypes = {
  users: PropTypes.arrayOf(
      PropTypes.shape({
        sender: PropTypes.shape({
          _id: PropTypes.oneOfType(
              [PropTypes.string, PropTypes.number],
          ).isRequired,
        }).isRequired,
      }),
  ).isRequired,
};

export default ConnectionsRequestList;
