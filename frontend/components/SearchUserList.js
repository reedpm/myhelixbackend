import React from 'react';
import {FlatList} from 'react-native';
import SearchUser from './SearchUser';
import PropTypes from 'prop-types';

const SearchUserList = ({users, isConnection, isPrivate}) => {
  const handlePress = async () => {
    console.log('handle pressed');
  };

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

SearchUserList.propTypes = {
  users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.oneOfType(
            [PropTypes.string, PropTypes.number],
        ).isRequired,
      }),
  ).isRequired,
  isConnection: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

export default SearchUserList;
