import React from 'react';
import {FlatList} from 'react-native';
import Connection from './Connection';
import PropTypes from 'prop-types';


const ConnectionsList = ({users}) => {
  // TO DO: Fill in logic for email press
  const handleEmailPress = (userId) => {
    console.log('Email Icon pressed for user:', userId);
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


ConnectionsList.propTypes = {
  users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.oneOfType(
            [PropTypes.string, PropTypes.number],
        ).isRequired,
      }),
  ).isRequired,
};


export default ConnectionsList;
