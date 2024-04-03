import React from 'react';
import {FlatList} from 'react-native';
import Following from './Following';
import PropTypes from 'prop-types';


const FollowingList = ({users}) => {
  return (
    <FlatList
      nestedScrollEnabled={true}
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <Following
          user={item}
        />
      )}
    />
  );
};

FollowingList.propTypes = {
  users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.oneOfType(
            [PropTypes.string, PropTypes.number],
        ).isRequired,
      }),
  ).isRequired,
};


export default FollowingList;
